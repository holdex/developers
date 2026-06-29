# How to Create and Manage Rules

Rules are enforceable operational guidelines — one concern per file,
structured so they can be referenced, audited, and kept up to date independently.
They are distinct from two other document types used across Holdex repos:

| Type | Purpose | Audience |
| --- | --- | --- |
| **Rule** | Defines what must or must not be done and why | Team members executing the work |
| **Spec** | Describes what to build and how it fits together | Builders planning implementation |
| **End-user doc** | Explains how to use something that already exists | External users or end consumers |

If a document enforces a behaviour, it is a rule.
If it describes a system or design, it is a spec.
If it helps someone use a product, it is end-user documentation.

## File format

Every rule is a standalone markdown file in `docs/rules/` with YAML frontmatter:

```yaml
---
id: XXX-NNN
title: "Short description of the rule"
status: "active"
enforcement: "manual"
severity: "error"
problem: "One-line statement of the situation this rule addresses"  # optional
---
```

Followed by the rule body:

```markdown
## [Rule title repeated as heading]

### Problem

What goes wrong when this rule is not followed. Be concrete — name the
failure mode, not an abstract risk.

### Solution

What to do. Use numbered steps for sequential actions, bullets for
independent items. Be specific enough that a new team member can apply
it without asking for clarification.

#### Acceptance Criteria

- [ ] Checkable item that confirms the rule was applied
- [ ] Another checkable item
```

`Acceptance Criteria` is optional but strongly recommended for rules that
require a sequence of steps to verify.

## File naming

Name rule files by ID only — no descriptive slug:

```
docs/rules/SAL-190.md   ✓
docs/rules/SAL-190-hourly-rate-expression.md   ✗
```

The title lives in the `title:` frontmatter field and in the README index.
The file name must stay stable even when the rule content changes. A
descriptive slug would need renaming whenever the rule evolves, breaking
any existing references.

## ID numbering

- Each repo has its own prefix (e.g. `SAL-` for `holdex/partners`,
  `HR-` for `holdex/hr-internal`, `DEV-` for `holdex/developers`)
- IDs increment by 10 (`DEV-010`, `DEV-020`) to leave room for insertion
  without renumbering the existing set
- IDs are permanent — never change or reuse a retired ID
- When inserting between existing IDs, use the midpoint
  (e.g. `DEV-015` between `DEV-010` and `DEV-020`)

## Status lifecycle

Every rule must have a `status` field. Change it as the rule evolves — never
delete a rule file, because its ID may be referenced elsewhere.

| Status | When to use |
| --- | --- |
| `active` | Current and enforced |
| `deprecated` | No longer relevant; kept so existing references resolve |
| `superseded` | Replaced by a newer rule |

When a rule is superseded, add `superseded_by: XXX-NNN` to its frontmatter
pointing to the replacement:

```yaml
---
id: DEV-010
title: "Old rule title"
status: "superseded"
superseded_by: "DEV-050"
enforcement: "manual"
severity: "error"
---
```

## README index

Every `docs/rules/` directory must have a corresponding README section that
indexes all active rules. Format each entry as a list item with the rule ID
linked to the file and a one-line description:

```markdown
## Section name

1. [DEV-010](./docs/rules/DEV-010.md): one-line description of what it enforces
1. [DEV-020](./docs/rules/DEV-020.md): one-line description of what it enforces
```

Deprecated and superseded rules are omitted from the index but their files
remain in `docs/rules/`.

## When not to write a rule

- **Advice without enforcement** — if there is no clear wrong behaviour, it
  is guidance, not a rule. Write it in the relevant README or doc instead.
- **Implementation detail** — how a system works internally belongs in a spec
  or inline code comment, not a rule.
- **One-time decisions** — things that were decided once and will not recur
  belong in an ADR or commit message, not a rule.
