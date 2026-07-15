#!/usr/bin/env node
// Audits the developer rules system (docs/rules/DEV-*.md) against the authoring
// rules those files themselves define. Mechanical checks only; wording quality
// is still a human review. Exits non-zero (listing every failure) if any rule
// breaks structure, frontmatter, linking, or index invariants, so the pre-push
// hook can block the push. Run directly with `npm run check:rules`.

import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const RULES_DIR = join(dirname(fileURLToPath(import.meta.url)), "..", "docs", "rules");
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

if (errors.length) {
  console.error(`Rules audit failed (${errors.length} issue${errors.length > 1 ? "s" : ""}):`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log(`Rules audit passed: ${files.length} rules, no issues.`);
