#!/usr/bin/env node
// Audits a rules system (docs/rules/<PREFIX>-*.md) against the authoring rules
// those files themselves define, plus the docs-tree reachability that DEV-337
// requires. The script is identical across every Holdex repo that adopts the
// standard; the only per-repo setting is the id prefix in rules.config.yml (see
// holdex/wizard#1614). Mechanical checks only; wording quality is still a human
// review. Exits non-zero (listing every failure) if any rule breaks structure,
// frontmatter, linking, or index invariants, or a doc is orphaned, so the
// pre-push hook can block the push. Run directly with `npm run check:rules`.
//
// Two scopes, deliberately different:
//
//   System invariants (dependency resolution and cycles, prose link targets,
//   index completeness, docs reachability, root README) always run across the
//   whole tree. They are cross-file by nature: a change to one file can orphan
//   or break another, so checking only what changed would miss the breakage.
//
//   The authoring standard for an individual rule (frontmatter, heading
//   structure, Problem length, writing conventions) runs only on the rule files
//   passed as arguments, i.e. the ones a push actually touches. A repo adopting
//   the audit part-way through its life would otherwise be blocked by every
//   pre-existing rule it did not write today. Rules are brought up to standard
//   as they are edited. With no arguments every rule is in scope, which is the
//   full audit for CI or a manual `npm run check:rules`.

import { existsSync, readFileSync, readdirSync } from "node:fs";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const REPO_ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DOCS_DIR = join(REPO_ROOT, "docs");
const RULES_DIR = join(DOCS_DIR, "rules");
const PROBLEM_MAX = 250; // DEV-050

// The only per-repo setting: the rule id prefix (e.g. DEV, HR). Everything else
// is the fixed org standard, identical in every repo.
const P = readFileSync(join(REPO_ROOT, "rules.config.yml"), "utf8")
  .match(/^idPrefix:\s*"?([A-Za-z]+)"?\s*$/m)[1];

const errors = [];
const fail = (file, msg) => errors.push(`${file}: ${msg}`);

const files = readdirSync(RULES_DIR)
  .filter((f) => new RegExp(`^${P}-\\d+\\.md$`).test(f))
  .sort();

// Rule files whose authoring standard is in scope: the ones named on the command
// line (any path is accepted; only rule files matter here), or all of them when
// none are named. Every rule is still read below, because the system invariants
// need the whole set.
const named = process.argv.slice(2).map((a) => basename(a));
const inScope = (file) => named.length === 0 || named.includes(file);

const ids = new Map(); // id -> filename
const deps = new Map(); // id -> [ids]

for (const file of files) {
  // Report every rule failure against its repo-relative path, so the message
  // names the offending rule and doubles as a clickable link to it.
  const ref = `docs/rules/${file}`;
  const text = readFileSync(join(RULES_DIR, file), "utf8");
  const fmMatch = text.match(/^---\n([\s\S]*?)\n---/);
  if (!fmMatch) {
    if (inScope(file)) fail(ref, "missing frontmatter block");
    continue;
  }
  const fm = fmMatch[1];

  const idMatch = fm.match(new RegExp(`^id:\\s*(${P}-\\d+)\\s*$`, "m"));
  if (!idMatch) {
    if (inScope(file)) fail(ref, "frontmatter has no id");
    continue;
  }
  const id = idMatch[1];
  const base = file.replace(/\.md$/, "");
  if (id !== base && inScope(file)) fail(ref, `id ${id} does not match filename`);
  ids.set(id, ref);

  const depMatch = fm.match(/^depends_on:\s*\[(.*?)\]\s*$/m);
  deps.set(
    id,
    depMatch
      ? depMatch[1]
          .split(",")
          .map((s) => s.trim().replace(/^["']|["']$/g, ""))
          .filter(Boolean)
      : [],
  );

  // Everything below is the authoring standard for this one rule, so it applies
  // only when the rule itself is in scope.
  if (!inScope(file)) continue;

  // DEV-020: body opens Problem, Solution, then nested Acceptance Criteria.
  if (!/^## Problem$/m.test(text)) fail(ref, "missing `## Problem`");
  if (!/^## Solution$/m.test(text)) fail(ref, "missing `## Solution`");
  if (!/^### Acceptance Criteria$/m.test(text))
    fail(ref, "missing `### Acceptance Criteria` (must nest under `###`)");

  // DEV-050: Problem paragraph length.
  const problem = text.match(/## Problem\s*\n+([\s\S]*?)\n\n/);
  if (problem) {
    const len = problem[1].replace(/\s+/g, " ").trim().length;
    if (len > PROBLEM_MAX) fail(ref, `Problem is ${len} chars (max ${PROBLEM_MAX})`);
  }

  // Writing convention: no em/en dashes.
  if (/[—–]/.test(text)) fail(ref, "contains an em/en dash");
}

// DEV-040: depends_on entries resolve.
for (const [id, list] of deps) {
  for (const dep of list) {
    if (!ids.has(dep)) fail(ids.get(id), `depends_on ${dep} does not resolve`);
  }
}

// DEV-040 sanity: no dependency cycles.
const inCycle = (node, seen) =>
  seen.has(node) || (deps.get(node) || []).some((d) => inCycle(d, new Set([...seen, node])));
for (const id of deps.keys()) {
  if (inCycle(id, new Set())) fail(ids.get(id), `is part of a dependency cycle`);
}

// DEV-040: every prose rule link resolves.
for (const file of files) {
  const text = readFileSync(join(RULES_DIR, file), "utf8");
  for (const m of text.matchAll(new RegExp(`\\]\\(\\.\\/(${P}-\\d+)\\.md\\)`, "g"))) {
    if (!ids.has(m[1])) fail(`docs/rules/${file}`, `links ${m[1]} which does not exist`);
  }
}

// Index: README lists every rule, and links no rule that does not exist.
const readme = readFileSync(join(RULES_DIR, "README.md"), "utf8");
for (const id of ids.keys()) {
  if (!readme.includes(`[${id}]`)) fail("docs/rules/README.md", `does not list ${id}`);
}
for (const m of new Set([...readme.matchAll(new RegExp(`\\[(${P}-\\d+)\\]`, "g"))].map((x) => x[1]))) {
  if (!ids.has(m)) fail("docs/rules/README.md", `links ${m} which does not exist`);
}

// DEV-337: docs README indexes the tree, and every doc is reachable from the
// root README through the index SPINE only. From a README, a spine link is a sibling
// .md in the same directory or an immediate subdirectory's README.md. Deeper
// links are cross-references, not index structure: they are ignored here, so a
// grandchild can never be reached by a shortcut from an ancestor, only through
// its own directory's README. This enforces that each doc is indexed by its
// nearest README and parents link child indexes, not files.
const rel = (p) => p.slice(REPO_ROOT.length + 1);

const walkMarkdown = (dir) => {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walkMarkdown(p));
    else if (entry.name.endsWith(".md")) out.push(p);
  }
  return out;
};

if (!existsSync(join(DOCS_DIR, "README.md"))) {
  fail("docs/README.md", "missing docs index");
}

const rootReadme = join(REPO_ROOT, "README.md");
const reachable = new Set();
const queue = [rootReadme];
while (queue.length) {
  const file = queue.shift();
  if (reachable.has(file)) continue;
  reachable.add(file);
  if (!existsSync(file)) continue;
  const dir = dirname(file);
  const body = readFileSync(file, "utf8");
  // Follow both inline links `](target)` and reference-link definitions
  // `[label]: target`, so a repo may use either link style and still index its
  // tree through the same spine.
  const targets = [
    ...[...body.matchAll(/\]\(([^)\s]+)\)/g)].map((m) => m[1]),
    ...[...body.matchAll(/^\s*\[[^\]]+\]:\s*(\S+)/gm)].map((m) => m[1]),
  ];
  for (const raw of targets) {
    const target = raw.split("#")[0];
    if (!target.endsWith(".md") || /^[a-z]+:/i.test(target)) continue;
    const abs = resolve(dir, target);
    const sameDir = dirname(abs) === dir;
    const childIndex = basename(abs) === "README.md" && dirname(dirname(abs)) === dir;
    if ((sameDir || childIndex) && !reachable.has(abs)) queue.push(abs);
  }
}

for (const md of walkMarkdown(DOCS_DIR)) {
  if (!reachable.has(md))
    fail(rel(md), "is not indexed by its directory's README (unreachable through the index spine)");
}

// DEV-338: the root README opens with a title + description and documents Local,
// Stage/Preview, and Production. Its link to the docs index is DEV-337's concern
// (the spine reachability check above), not re-checked here.
if (!existsSync(rootReadme)) {
  fail("README.md", "repository has no root README");
} else {
  const readme = readFileSync(rootReadme, "utf8");
  const h1 = readme.match(/^#\s+\S.*$/m);
  if (!h1) fail("README.md", "has no H1 title");
  else {
    const afterH1 = readme.slice(readme.indexOf(h1[0]) + h1[0].length);
    const description = afterH1.split(/^##\s/m)[0].replace(/^\s*(#.*)?$/gm, "").trim();
    if (!description) fail("README.md", "has no description before the first section");
  }
  if (!/^##\s+(setup|installation|getting started)\b/im.test(readme))
    fail("README.md", "has no Setup / Installation section");
  for (const [label, re] of [
    ["Local", /^###\s+.*\blocal\b/im],
    ["Stage/Preview", /^###\s+.*\b(stage|preview)\b/im],
    ["Production", /^###\s+.*\bproduction\b/im],
  ]) {
    if (!re.test(readme)) fail("README.md", `Setup is missing a ${label} subsection`);
  }
}

if (errors.length) {
  console.error(`Rules audit failed (${errors.length} issue${errors.length > 1 ? "s" : ""}):`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
const scoped = files.filter(inScope).length;
console.log(
  scoped === files.length
    ? `Rules audit passed: ${files.length} rules, no issues.`
    : `Rules audit passed: system invariants across ${files.length} rules, ` +
      `authoring standard on the ${scoped} changed, no issues.`,
);
