#!/usr/bin/env node
// Audits a rules system (docs/rules/<PREFIX>-*.md) against the shared authoring
// standard those files define. The script is identical across every Holdex repo
// that adopts the standard; all repo-specific layout lives in rules.config.yml
// beside this file's repo root (see holdex/wizard#1614: one standard, per-repo
// adjustable settings, run locally on pre-push with CI as the safety net).
// Mechanical checks only; wording quality is still a human review. Exits
// non-zero (listing every failure) so the pre-push hook can block the push. Run
// directly with `npm run check:rules`.

import { existsSync, readFileSync, readdirSync } from "node:fs";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const REPO_ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

// Minimal YAML reader for this config's shape only: top-level `key: value`
// scalars and `key:` blocks whose members are `- item` list entries. Scalars
// coerce to boolean, integer, or (quote-stripped) string; an empty value is
// null. This avoids a runtime dependency so the pre-push hook needs only node.
function loadConfig(path) {
  const cfg = {};
  let listKey = null;
  for (const raw of readFileSync(path, "utf8").split("\n")) {
    const line = raw.replace(/\s+#.*$/, "").replace(/^#.*$/, "");
    if (!line.trim()) continue;
    const item = line.match(/^\s+-\s+(.*)$/);
    if (item && listKey) {
      cfg[listKey].push(coerce(item[1]));
      continue;
    }
    const kv = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (!kv) continue;
    const [, key, value] = kv;
    if (value === "") {
      cfg[key] = [];
      listKey = key;
    } else {
      cfg[key] = coerce(value);
      listKey = null;
    }
  }
  return cfg;
}
function coerce(v) {
  const s = v.trim();
  if (s === "true") return true;
  if (s === "false") return false;
  if (s === "null" || s === "") return null;
  if (/^-?\d+$/.test(s)) return Number(s);
  return s.replace(/^["']|["']$/g, "");
}

const cfg = loadConfig(join(REPO_ROOT, "rules.config.yml"));
const RULES_DIR = join(REPO_ROOT, cfg.rulesDir);
const INDEX_FILE = join(REPO_ROOT, cfg.indexFile);
const DOCS_DIR = join(REPO_ROOT, "docs");
const P = cfg.idPrefix;
const idRe = new RegExp(`${P}-\\d+`);
const fileRe =
  cfg.filenameStyle === "id-slug"
    ? new RegExp(`^${P}-\\d+-[a-z0-9-]+\\.md$`)
    : new RegExp(`^${P}-\\d+\\.md$`);

const errors = [];
const fail = (file, msg) => errors.push(`${file}: ${msg}`);
const num = (id) => Number(id.replace(`${P}-`, ""));

const files = readdirSync(RULES_DIR)
  .filter((f) => fileRe.test(f))
  .sort();

const ids = new Map(); // id -> repo-relative path
const deps = new Map(); // id -> [ids]

for (const file of files) {
  // Report every failure against its repo-relative path, so the message names
  // the offending rule and doubles as a clickable link to it.
  const ref = `${cfg.rulesDir}/${file}`;
  const text = readFileSync(join(RULES_DIR, file), "utf8");
  const fmMatch = text.match(/^---\n([\s\S]*?)\n---/);
  if (!fmMatch) {
    fail(ref, "missing frontmatter block");
    continue;
  }
  const fm = fmMatch[1];

  const idMatch = fm.match(new RegExp(`^id:\\s*"?(${P}-\\d+)"?\\s*$`, "m"));
  if (!idMatch) {
    fail(ref, "frontmatter has no id");
    continue;
  }
  const id = idMatch[1];
  const base =
    cfg.filenameStyle === "id-slug" ? file.match(new RegExp(`^(${P}-\\d+)-`))[1] : file.replace(/\.md$/, "");
  if (id !== base) fail(ref, `id ${id} does not match filename ${cfg.filenameStyle === "id-slug" ? "prefix " : ""}${base}`);
  ids.set(id, ref);

  for (const field of cfg.requiredFrontmatter) {
    if (!new RegExp(`^${field}:\\s*\\S`, "m").test(fm)) fail(ref, `frontmatter missing \`${field}\``);
  }

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

  if (cfg.titleAsH2) {
    const titleMatch = fm.match(/^title:\s*"(.+)"\s*$/m);
    if (titleMatch && !text.includes(`\n## ${titleMatch[1]}\n`)) fail(ref, "body H2 does not repeat the frontmatter title");
  }
  const hasHeading = (h) => new RegExp(`^${h.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, "m").test(text);
  if (!hasHeading(cfg.headingProblem)) fail(ref, `missing \`${cfg.headingProblem}\``);
  if (!hasHeading(cfg.headingSolution)) fail(ref, `missing \`${cfg.headingSolution}\``);
  if (cfg.requireAcceptance && !hasHeading(cfg.headingAcceptance))
    fail(ref, `missing \`${cfg.headingAcceptance}\``);

  if (cfg.problemMaxLength) {
    const problem = text.match(new RegExp(`${cfg.headingProblem}\\s*\\n+([\\s\\S]*?)\\n\\n`));
    if (problem) {
      const len = problem[1].replace(/\s+/g, " ").trim().length;
      if (len > cfg.problemMaxLength) fail(ref, `Problem is ${len} chars (max ${cfg.problemMaxLength})`);
    }
  }

  if (cfg.noDashes && /[—–]/.test(text)) fail(ref, "contains an em/en dash");
}

// depends_on entries resolve, optionally point to a lower id, and form no cycles.
for (const [id, list] of deps) {
  for (const dep of list) {
    if (!ids.has(dep)) fail(ids.get(id), `depends_on ${dep} does not resolve`);
    else if (cfg.depsPointLower && num(dep) >= num(id)) fail(ids.get(id), `depends_on ${dep} does not point to a lower id`);
  }
}
const inCycle = (node, seen) =>
  seen.has(node) || (deps.get(node) || []).some((d) => inCycle(d, new Set([...seen, node])));
for (const id of deps.keys()) {
  if (inCycle(id, new Set())) fail(ids.get(id), `is part of a dependency cycle`);
}

// Cross-rule links resolve, in whichever link style this repo uses.
for (const file of files) {
  const text = readFileSync(join(RULES_DIR, file), "utf8");
  if (cfg.linkStyle === "inline") {
    for (const m of text.matchAll(new RegExp(`\\]\\(\\.\\/(${P}-\\d+)\\.md\\)`, "g")))
      if (!ids.has(m[1])) fail(`${cfg.rulesDir}/${file}`, `links ${m[1]} which does not exist`);
  } else {
    for (const m of text.matchAll(new RegExp(`^\\[${P.toLowerCase()}-\\d+\\]:\\s*(\\S+)\\s*$`, "gm"))) {
      const target = m[1].split("#")[0];
      if (target.endsWith(".md") && !existsSync(resolve(dirname(join(RULES_DIR, file)), target)))
        fail(`${cfg.rulesDir}/${file}`, `link def points to missing ${target}`);
    }
  }
}

// Index lists every rule, and links no rule that does not exist.
const index = readFileSync(INDEX_FILE, "utf8");
for (const id of ids.keys()) {
  if (!index.includes(`[${id}]`)) fail(cfg.indexFile, `does not list ${id}`);
}
for (const m of new Set([...index.matchAll(new RegExp(`\\[(${P}-\\d+)\\]`, "g"))].map((x) => x[1]))) {
  if (!ids.has(m)) fail(cfg.indexFile, `links ${m} which does not exist`);
}

// Optional: every doc is reachable from the root README through the index spine
// (a sibling .md or an immediate subdirectory's README.md). Deeper links are
// cross-references, not index structure, so a grandchild is only reached through
// its own directory's README.
if (cfg.checkDocsSpine) {
  const rel = (p) => p.slice(REPO_ROOT.length + 1);
  const walk = (dir) => {
    const out = [];
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      const p = join(dir, e.name);
      if (e.isDirectory()) out.push(...walk(p));
      else if (e.name.endsWith(".md")) out.push(p);
    }
    return out;
  };
  if (!existsSync(join(DOCS_DIR, "README.md"))) fail("docs/README.md", "missing docs index");
  const reachable = new Set();
  const queue = [join(REPO_ROOT, "README.md")];
  while (queue.length) {
    const file = queue.shift();
    if (reachable.has(file)) continue;
    reachable.add(file);
    if (!existsSync(file)) continue;
    const dir = dirname(file);
    for (const m of readFileSync(file, "utf8").matchAll(/\]\(([^)\s]+)\)/g)) {
      const target = m[1].split("#")[0];
      if (!target.endsWith(".md") || /^[a-z]+:/i.test(target)) continue;
      const abs = resolve(dir, target);
      const sameDir = dirname(abs) === dir;
      const childIndex = basename(abs) === "README.md" && dirname(dirname(abs)) === dir;
      if ((sameDir || childIndex) && !reachable.has(abs)) queue.push(abs);
    }
  }
  for (const md of walk(DOCS_DIR))
    if (!reachable.has(md)) fail(rel(md), "is not indexed by its directory's README (unreachable through the index spine)");
}

// Optional: the root README opens with a title + description and documents
// Local, Stage/Preview, and Production setup.
if (cfg.checkRootReadme) {
  const rootReadme = join(REPO_ROOT, "README.md");
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
    ])
      if (!re.test(readme)) fail("README.md", `Setup is missing a ${label} subsection`);
  }
}

if (errors.length) {
  console.error(`Rules audit failed (${errors.length} issue${errors.length > 1 ? "s" : ""}):`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log(`Rules audit passed: ${files.length} rules, no issues.`);
