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
- [DEV-050](./DEV-050.md): keep the Problem statement short

### 1. Contribution model

How work flows from a business aim to a delivered change: Goal, Problem,
Solution, Spec.

- [DEV-110](./DEV-110.md): start from a Goal and take ownership
- [DEV-120](./DEV-120.md): keep the Goal description to the allowed sections
- [DEV-130](./DEV-130.md): understand and agree the Spec before starting
- [DEV-140](./DEV-140.md): give an ETA once the goal is clear
- [DEV-150](./DEV-150.md): identify the business Problems blocking the goal
- [DEV-160](./DEV-160.md): write a clear Problem statement
- [DEV-170](./DEV-170.md): deliver work as a pull request
- [DEV-180](./DEV-180.md): keep the Spec as unimplemented behavior and graduate
  it

### 2. Communication

Where discussion goes and how work is referenced.

- [DEV-210](./DEV-210.md): route discussion to the right channel
- [DEV-220](./DEV-220.md): reference issues and PRs as list items

### 3. PR requirements

What a pull request must satisfy before it merges.

- [DEV-310](./DEV-310.md): sign every commit
- [DEV-320](./DEV-320.md): scope a PR to a few hours
- [DEV-330](./DEV-330.md): keep docs in sync and each fact in one place
- [DEV-340](./DEV-340.md): name a PR for what users gain
- [DEV-350](./DEV-350.md): mark a design PR docs(ui) with a Design section
- [DEV-360](./DEV-360.md): follow the PR lifecycle
- [DEV-370](./DEV-370.md): report time across all stages
- [DEV-380](./DEV-380.md): enforce markdown lint on push with a pinned rumdl
  hook

The remaining categories are migrating from the
[Contributing Guidelines](../CONTRIBUTING.md) into rules.

## Rule file format

The file format is itself defined by the Authoring rules above:
[DEV-020](./DEV-020.md) fixes the body shape, [DEV-030](./DEV-030.md) the shared
frontmatter, and [DEV-040](./DEV-040.md) how rules reference each other. A rules
system in another repo may add its own frontmatter fields, documented in that
repo's own rules index.
