#!/usr/bin/env node
// Audits the developer rules system (docs/rules/DEV-*.md) against the authoring
// rules those files themselves define, plus the docs-tree reachability that
// DEV-337 requires. Mechanical checks only; wording quality is still a human
// review. Exits non-zero (listing every failure) if any rule breaks structure,
// frontmatter, linking, or index invariants, or a doc is orphaned, so the
// pre-push hook can block the push. Run directly with `npm run check:rules`.

import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const REPO_ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DOCS_DIR = join(REPO_ROOT, "docs");
const RULES_DIR = join(DOCS_DIR, "rules");
const PROBLEM_MAX = 250; // DEV-050

const errors = [];
const fail = (file, msg) => errors.push(`${file}: ${msg}`);

const files = readdirSync(RULES_DIR)
  .filter((f) => /^DEV-\d+\.md$/.test(f))
  .sort();

const ids = new Map(); // id -> filename
const deps = new Map(); // id -> [ids]

for (const file of files) {
  const text = readFileSync(join(RULES_DIR, file), "utf8");
  const fmMatch = text.match(/^---\n([\s\S]*?)\n---/);
  if (!fmMatch) {
    fail(file, "missing frontmatter block");
    continue;
  }
  const fm = fmMatch[1];

  const idMatch = fm.match(/^id:\s*(DEV-\d+)\s*$/m);
  if (!idMatch) {
    fail(file, "frontmatter has no id");
    continue;
  }
  const id = idMatch[1];
  const base = file.replace(/\.md$/, "");
  if (id !== base) fail(file, `id ${id} does not match filename`);
  ids.set(id, file);

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

  // DEV-020: body opens Problem, Solution, then nested Acceptance Criteria.
  if (!/^## Problem$/m.test(text)) fail(file, "missing `## Problem`");
  if (!/^## Solution$/m.test(text)) fail(file, "missing `## Solution`");
  if (!/^### Acceptance Criteria$/m.test(text))
    fail(file, "missing `### Acceptance Criteria` (must nest under `###`)");

  // DEV-050: Problem paragraph length.
  const problem = text.match(/## Problem\s*\n+([\s\S]*?)\n\n/);
  if (problem) {
    const len = problem[1].replace(/\s+/g, " ").trim().length;
    if (len > PROBLEM_MAX) fail(file, `Problem is ${len} chars (max ${PROBLEM_MAX})`);
  }

  // Writing convention: no em/en dashes.
  if (/[—–]/.test(text)) fail(file, "contains an em/en dash");
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
  for (const m of text.matchAll(/\]\(\.\/(DEV-\d+)\.md\)/g)) {
    if (!ids.has(m[1])) fail(file, `links ${m[1]} which does not exist`);
  }
}

// Index: README lists every rule, and links no rule that does not exist.
const readme = readFileSync(join(RULES_DIR, "README.md"), "utf8");
for (const id of ids.keys()) {
  if (!readme.includes(`[${id}]`)) fail("README.md", `does not list ${id}`);
}
for (const m of new Set([...readme.matchAll(/\[(DEV-\d+)\]/g)].map((x) => x[1]))) {
  if (!ids.has(m)) fail("README.md", `links ${m} which does not exist`);
}

// DEV-337: docs/README.md indexes the tree, and every doc is reachable from the
// root README by following local markdown links (no orphans).
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

// Breadth-first crawl from the root README, following only local .md links.
const rootReadme = join(REPO_ROOT, "README.md");
const reachable = new Set();
const queue = [rootReadme];
while (queue.length) {
  const file = queue.shift();
  if (reachable.has(file)) continue;
  reachable.add(file);
  if (!existsSync(file)) continue;
  for (const m of readFileSync(file, "utf8").matchAll(/\]\(([^)\s]+)\)/g)) {
    const target = m[1].split("#")[0];
    if (!target.endsWith(".md") || /^[a-z]+:/i.test(target)) continue;
    const abs = resolve(dirname(file), target);
    if (!reachable.has(abs)) queue.push(abs);
  }
}

for (const md of walkMarkdown(DOCS_DIR)) {
  if (!reachable.has(md)) fail(rel(md), "is orphaned: not reachable from the root README");
}

if (errors.length) {
  console.error(`Rules audit failed (${errors.length} issue${errors.length > 1 ? "s" : ""}):`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log(`Rules audit passed: ${files.length} rules, no issues.`);
