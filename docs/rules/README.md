# Developer Rules

The org-wide contribution conventions as a **rules system**: small numbered
files that each enforce one checkable behavior.

Rules are grouped by category. Each `DEV-` rule enforces one behavior and
carries acceptance criteria you can check. The Authoring category doubles as the
shared standard that any other rules system can adopt.

## Categories

Rules are numbered by category: DEV-0xx Authoring, DEV-1xx Contribution model,
DEV-2xx Communication, DEV-3xx PR requirements, DEV-4xx Review.

### 0. Authoring

How to write a rule. These rules define the shape every other rule follows,
including their own.

- [DEV-010](./DEV-010.md): enforce one behavior per rule file
- [DEV-020](./DEV-020.md): structure a rule as Problem, Solution, Acceptance
  Criteria
- [DEV-030](./DEV-030.md): carry the shared rule frontmatter
- [DEV-040](./DEV-040.md): reference a rule by ID as a followable link

The remaining categories are migrating from the
[Contributing Guidelines](../CONTRIBUTING.md) into rules.

## Rule file format

The file format is itself defined by the Authoring rules above:
[DEV-020](./DEV-020.md) fixes the body shape, [DEV-030](./DEV-030.md) the shared
frontmatter, and [DEV-040](./DEV-040.md) how rules reference each other. A rules
system in another repo may add its own frontmatter fields, documented in that
repo's own rules index.
