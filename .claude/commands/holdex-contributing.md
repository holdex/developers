---
name: holdex-contributing
description: Holdex contributing rules for GitHub issues and PRs. Invoke before creating or updating issues or PRs in any Holdex repository.
---

All PRs and issues must follow the
[Holdex Contributing Guidelines](https://github.com/holdex/developers/blob/main/docs/CONTRIBUTING.md).

## Issues

- Name: `Problem: [statement]` — must be a **job story** describing what a
  specific user **cannot do** (the whole title under 65 characters).
  - Good: `employees can't safely handle fund disbursements`
  - Bad: `fund handling issue`
- Link each Problem as a **sub-issue** of its parent Goal issue.
- When referencing other issues or PRs, always use a **list item**, never inline:

  ```md
  - https://github.com/holdex/hr-internal/issues/123
  ```

## Pull Requests

- **Title**: `type(scope): action` — user-focused, present tense, Conventional
  Commits format.
  - Good: `docs: protect client funds from unauthorized contractor custody`
  - Bad: `Add FUND_HANDLING.md`
- **Scope**: fits within 3–4 hours of work. Decompose if larger.
- **Lifecycle** (in order):
  1. Open as a **draft PR** immediately when starting work.
  1. Link to the Problem issue using a closing keyword (`Closes #123`).
  1. Assign yourself.
  1. Resolve all CI checks.
  1. Assign at least one reviewer.
  1. Mark ready for review only when all steps above are done.
- **Do not merge** without an approved review.
