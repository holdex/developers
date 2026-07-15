#!/usr/bin/env node
// Audits a rules system (docs/rules/<PREFIX>-*.md) against the shared authoring
// standard those files define, plus the docs-tree reachability the standard
// requires. The script is identical across every Holdex repo that adopts the
// standard; the only per-repo setting is the id prefix in rules.config.yml (see
// holdex/wizard#1614). Mechanical checks only; wording quality is still a human
// review. Exits non-zero (listing every failure) if any rule breaks structure,
// frontmatter, linking, or index invariants, or a doc is orphaned, so the
// pre-push hook can block the push. Run directly with `npm run check:rules`.

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

const ids = new Map(); // id -> filename
const deps = new Map(); // id -> [ids]

for (const file of files) {
  // Report every rule failure against its repo-relative path, so the message
  // names the offending rule and doubles as a clickable link to it.
  const ref = `docs/rules/${file}`;
  const text = readFileSync(join(RULES_DIR, file), "utf8");
  const fmMatch = text.match(/^---\n([\s\S]*?)\n---/);
  if (!fmMatch) {
    fail(ref, "missing frontmatter block");
    continue;
  }
  const fm = fmMatch[1];

  const idMatch = fm.match(new RegExp(`^id:\\s*(${P}-\\d+)\\s*$`, "m"));
  if (!idMatch) {
    fail(ref, "frontmatter has no id");
    continue;
  }
  const id = idMatch[1];
  const base = file.replace(/\.md$/, "");
  if (id !== base) fail(ref, `id ${id} does not match filename`);
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

  // Body opens Problem, Solution, then nested Acceptance Criteria.
  if (!/^## Problem$/m.test(text)) fail(ref, "missing `## Problem`");
  if (!/^## Solution$/m.test(text)) fail(ref, "missing `## Solution`");
  if (!/^### Acceptance Criteria$/m.test(text))
    fail(ref, "missing `### Acceptance Criteria` (must nest under `###`)");

  // Problem paragraph length.
  const problem = text.match(/## Problem\s*\n+([\s\S]*?)\n\n/);
  if (problem) {
    const len = problem[1].replace(/\s+/g, " ").trim().length;
    if (len > PROBLEM_MAX) fail(ref, `Problem is ${len} chars (max ${PROBLEM_MAX})`);
  }

  // Writing convention: no em/en dashes.
  if (/[—–]/.test(text)) fail(ref, "contains an em/en dash");
}

// depends_on entries resolve.
for (const [id, list] of deps) {
  for (const dep of list) {
    if (!ids.has(dep)) fail(ids.get(id), `depends_on ${dep} does not resolve`);
  }
}

// No dependency cycles.
const inCycle = (node, seen) =>
  seen.has(node) || (deps.get(node) || []).some((d) => inCycle(d, new Set([...seen, node])));
for (const id of deps.keys()) {
  if (inCycle(id, new Set())) fail(ids.get(id), `is part of a dependency cycle`);
}

// Every prose rule link resolves.
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

// docs README indexes the tree, and every doc is reachable from the root README
// through the index SPINE only. From a README, a spine link is either a sibling
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

// The root README opens with a title + description and documents Local,
// Stage/Preview, and Production. Its link to the docs index is the spine
// reachability check's concern above, not re-checked here.
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
console.log(`Rules audit passed: ${files.length} rules, no issues.`);
