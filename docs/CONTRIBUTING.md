# Contributing Guidelines

Please read our [Code of Conduct](./CODE_OF_CONDUCT.md) to keep our community
approachable and respectful.

> [!TIP]
> You can use [Wizard GitHub App][2] and [Wizard Browser Extension][1] to
> simplify some of the workflows described in these Guidelines.

## Table of Contents

- [Getting started](#getting-started)
  - [Goal](#goal)
    - [Goal description](#goal-description)
  - [Problem](#problem)
  - [Solution](#solution)
  - [Specs](#specs)
- [Communication Guidelines](#communication-guidelines)
- [PR Requirements](#pr-requirements)
  - [Commit Signature Verification](#commit-signature-verification)
  - [Scoping](#scoping)
  - [Naming](#naming)
  - [PR Lifecycle](#pr-lifecycle)
  - [Review Process](#review-process)

## Getting started

There are three core contribution pillars:

1. **Goal** – a business aim
1. **Problem** – a barrier to achieving the Goal
1. **Solution** – the actual deliverable which resolves the problem

### Goal

To find a Goal to work on, browse GitHub Issues in the relevant repository and
filter for issues with the `Goal:` prefix. Prioritize issues based on their
impact and urgency. If you are unsure which Goal to choose, please consult your
lead.

As soon as you get involved, you must:

1. assign yourself to the Goal issue.
1. review the [Spec](#specs) linked from the Goal issue and assess outstanding
   Problems,
1. provide an estimated time of achieving (ETA) the Goal.

> [!NOTE]
> Goals follow the naming pattern: `Goal: [statement]` and must link to a Spec
> with an ETA.
>
> Before the Spec PR merges, link to the PR. After it merges, update the Goal
> description to link to the file on `main`:
> `https://github.com/<org>/<repo>/blob/main/docs/specs/<feature>.md`

#### Goal description

The Goal issue description may only use the sections below (plus app-managed
warning blocks at the end). Do not add instructions, scope notes, or design
decisions here — those belong in the Spec file.

```text
# Spec

https://github.com/<org>/<repo>/blob/main/docs/specs/<name>.md

# Deadline

ETA: 01-Jan-2026

# Stakeholders Interview

- https://docs.google.com/document/d/...
```

- **Spec** (required): exactly one URL to `docs/specs/<name>.md` on the `main`
  branch. No other text in this section.
- **Deadline** (required when assignees are present): must include a line
  `ETA: <date>`. Use `ETA: undefined` when no date is known yet. Prefer
  `ETA: DD-MMM-YYYY` (for example, `ETA: 01-Jan-2026`). You can set or update
  the date with `@holdex issue set-eta` (see
  [Wizard docs](https://wizard.holdex.io/docs/commands)).
- **Stakeholders Interview** (optional): Google Document URLs for ideation or
  discovery, as a bullet list (one URL per line). Does not replace the Spec link.
- **Custom sections** (optional): additional H1 headings for grouping issue or
  PR references only — for example, `# Blocked by` followed by issue or PR
  links. No free-form text inside these sections.

Wizard may auto-create `docs/specs/<name>.md` (frontmatter only) when a Goal is
opened without a valid Spec URL, and update the Goal description with the link.

Google Docs can be added with `@holdex goal create-google-doc` or
`@holdex goal attach-google-doc <url>`, or from the **Create Google Document**
button in the GitHub sidebar on Goal issues ([Wizard Browser Extension][1]).

### Problem

Once a Goal is clear, identify what prevents its achievement. Anything that acts
as a barrier is a Problem.

> [!NOTE]
> Report each Problem as a [GitHub Issue](https://docs.github.com/en/issues)
> using the naming pattern: `Problem: [statement]`. Keep it short (under 65
> characters). Add it as a **sub-issue** of the Goal and include the Goal issue
> link in the description.

The statement must be a **job story** — describe what a specific user
**cannot do** or what is broken for them. Ask:
_"What can [user] not do because of this problem?"_

| **Good** ✅                                    | **Bad** ❌                                   | **Why?**                       |
| ---------------------------------------------- | -------------------------------------------- | ------------------------------ |
| `operators can't view their account balance`   | `operators don't have their account balance` | Describes inability, not state |
| `users can't submit a form without refreshing` | `form submission issue`                      | Vague, no actor or action      |
| `admins can't export reports as CSV`           | `CSV export missing`                         | No subject, not a job story    |

Every Problem issue body must include both a `# Problem` and a `# Solution`
section, describing the recommended approach or workaround before work begins.

```md
# Problem

Describe what the user cannot do and why it matters.

## Solution

Describe the recommended approach or workaround.
```

### Solution

Whether it's code, design, or marketing material, we expect a lean and clean
solution from the contributor.

> [!NOTE]
> Solution is presented in GitHub as a
> [Pull Request (PR)](https://docs.github.com/en/pull-requests) in compliance
> with [PR Requirements](#pr-requirements).

For reimbursable work-related costs, see [Expenses](./EXPENSES.md).

### Specs

A Spec describes the intended behavior for a Goal — not what currently exists,
but what the Goal aims to deliver. It is a markdown file in `docs/specs/`.

Link it from the Goal issue under `# Spec` — see
[Goal description](#goal-description) for the required format. Use
`# Stakeholders Interview` in the Goal description for Google Documents used
during ideation (not in the Spec file).

A Goal must not be opened without a linked Spec.

#### Lifecycle

When a Goal is opened, [Wizard][2] may create an empty
`docs/specs/<feature>.md` (frontmatter only) and link it from the Goal if no Spec
URL is present yet.

`docs/specs/<feature>.md` is the backlog of unimplemented behavior for a Goal.

It shrinks as the Goal is implemented. Each PR that delivers behavior described
in the Spec must move the corresponding sections from `docs/specs/<feature>.md`
into the appropriate file in `docs/`. A spec may graduate to more than one file
in `docs/` when its sections cover different areas. When all sections have
graduated, keep the file as frontmatter only — do not delete it. The `# Spec`
link in the Goal description must keep working, and the Goal can be reopened
without re-creating the file.

It can also grow. When scope is added after the Spec is merged, open a new PR
against the spec file to add the new sections. Create Problem issues for the
added scope. The same rule applies — sections must graduate to `docs/` as they
are implemented.

```text
docs/specs/<feature>.md   ← only unimplemented sections
docs/<feature>.md         ← only what is currently shipped
```

Never add unimplemented behavior to `docs/`. Never leave implemented behavior in
`docs/specs/`.

#### Format

```md
---
goal: <link to Goal issue>
---

# Feature Name

## Overview

What this Goal enables for users.

## [Section]

Describe what users can do, not how the system works internally.
```

Sections are defined by the author. Keep them user-focused and scoped to
observable behavior. Include a `## Design` section using the markup described in
[Design PRs](#design-prs) when the Goal has a design component.

#### Discussing a Spec

If the Spec PR is not yet merged, propose changes via review comments on that
PR. If the Spec is already merged, open a new PR against the spec file. Do not
use Goal issue comments for scope discussions — they belong in the Spec.

## Communication Guidelines

### Discussion channels

Direct discussions to the appropriate channel:

- **Spec file** — clarifications about Goal scope or business context; propose
  changes via PR or review comments on an open Spec PR
- **Problem issues** — tracking obstacles that prevent achieving the Goal
- **Goal issues** — linking Specs, tracking Problems, and monitoring progress
  only

> [!IMPORTANT]
> Do not post Problem status updates, PR notifications, or progress updates in
> Goal issues. The Goal → Problem → PR chain makes these redundant and adds
> noise.

If you identify a potential new problem but are unsure whether it is planned:

1. Check if there is an existing Problem issue related to your concern.
1. If not, open a PR against the Spec file, or leave a review comment if the
   Spec PR is not yet merged.
1. If necessary, create a new Problem issue and discuss it there.

If someone's action is required to unblock progress, assign them to the Goal
issue so the dependency is visible.

### Referencing issues and PRs

When referencing issues or pull requests, use a list item format — GitHub
automatically expands it to show the title.

**Correct** — use a list item:

```md
See these related items:

- <issue_or_pr_url>
- <another_issue_or_pr_url>
- #4
- #12
```

**Incorrect** — avoid inline pasting:

```md
Check this out: <issue_or_pr_url> Related: <issue_or_pr_url> See
<issue_or_pr_url> for details
```

## PR Requirements

> [!WARNING]
> PRs that do not meet the following requirements will be rejected.

Before marking your PR as ready for review, confirm:

- [ ] Commits are signed
- [ ] PR scope fits within 3–4 hours of work
- [ ] All CI checks pass
- [ ] PR is linked to a Problem issue
- [ ] At least one reviewer is assigned
- [ ] Time is reported
- [ ] PR title follows `type(scope): action` naming convention
- [ ] Preview link is included (if applicable)
- [ ] README is updated to reflect any functional changes
- [ ] Spec sections moved to `docs/` for any behavior this PR delivers (if
      applicable)

### Commit Signature Verification

All commits must be signed. See
[GitHub's documentation on commit signature verification](https://docs.github.com/en/authentication/managing-commit-signature-verification/about-commit-signature-verification).

> [!NOTE]
> We recommend signing commits using an
> [SSH key](https://docs.github.com/en/authentication/managing-commit-signature-verification/about-commit-signature-verification#ssh-commit-signature-verification).
> Ensure your Git version supports SSH signature verification (Git 2.34 or
> later).

### Scoping

> [!TIP]
> Here's a [good resource](https://youtu.be/bmSAYlu0NcY?si=2lLQeY1PGCY9tcvX) on
> software design philosophy.

When planning the scope of work, make sure you
[keep PRs small](https://artsy.github.io/blog/2021/03/09/strategies-for-small-focused-pull-requests/).
You must be able to complete your PR within 3–4 hours.  
If the solution requires more time, then decompose it into smaller independent
PRs. In case your smaller PRs can't be used on production, use feature flags.

PRs with no activity for 24 hours are closed unless a comment explains the
delay.

When introducing functional changes, cross-check the README and update it in the
same PR. If your change affects anything documented there — setup steps,
environment requirements, file references — the README must stay in sync.

When adding new documentation files, ensure they are reachable via interlinking
from the root entry point. Do not create orphaned files.

Do not duplicate content across files. Each piece of information — procedures,
templates, configuration steps — must live in exactly one place. Reference it
from other docs rather than copying it.

### Naming

> [!NOTE]
> We use PR titles to communicate changes to all stakeholders, including
> non-technical users.

PR names must be:

1. **User-focused**: Describe what users gain, not technical implementation
1. **Follow [Conventional Commits](https://www.conventionalcommits.org)**
1. **Clear & simple** (present tense, action-oriented)
1. **Under 65 characters**

| **Good Examples** ✅   | **Bad Examples** ❌            | **Why?**           |
| ---------------------- | ------------------------------ | ------------------ |
| `feat(ui): play music` | `Create player`                | Missing scope/type |
| `fix(sdk): mute sound` | `Fix: add file to mute sound`  | Technical details  |
| `test(api): open door` | `Feat: modified door function` | Vague, past tense  |

A feature isn't a button, toggle, or handler — it's what the user gains from it.
Ask _"What will users be able to do?"_ not _"What am I building?"_ Use action
verbs: _View, Play, Customize, Save_.

> [!WARNING]
> This rule applies to **all PR types**, including `docs`. Do not use verbs that
> describe what you did ("document", "update", "add") — use verbs that describe
> what users can now do.
>
> | **Good** ✅                                   | **Bad** ❌                                 |
> | --------------------------------------------- | ------------------------------------------ |
> | `docs(typefully): log in with shared account` | `docs(typefully): document shared account` |
> | `docs(api): authenticate with OAuth`          | `docs(api): add OAuth section to README`   |

#### Design PRs

Design PRs use `docs(ui)` as the type and scope. e.g.:
`docs(ui): design table component`

Add a `## Design` section to the relevant Spec file. Structure it with the
following markup:

```text
## Design
- [/page](https://figma.com/your-design-file-url)
  - ./page/{params}
    - (group)
      - [[state]](https://figma.com/your-design-file-url)
```

**Key:**

- **`/...`** — a page
- **`{...}`** — a dynamic URL parameter
- **`(...)`** — a grouping of related features or components
- **`[...]`** — a specific state (e.g. popup or modal)
- Indentation represents nesting hierarchy

Example:

```text
## Design
- [/lending](https://figma.com/your-design-file-url)
  - ./vaults/{poolAddr}
    - (Auction)
      - [[Withdraw Popup]](https://figma.com/your-design-file-url)
      - [[Bid Popup]](https://figma.com/your-design-file-url)
```

### PR Lifecycle

Follow these steps in order from start to submission:

1. **Open a [draft
   PR](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests#draft-pull-requests)**
   right away when you start working on a Problem.
1. **[Link the
   PR](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue#linking-a-pull-request-to-an-issue-using-a-keyword)**
   to the corresponding Problem issue using a closing keyword.
1. **Assign yourself** so it is clear who is working on it.
1. **Report your time** spent across all stages: planning (40%), implementation,
   and QA (20–30%). Open the PR early so time tracking starts from the
   beginning, including investigation.
1. **Assign at least one reviewer** (team or individual).
1. **Include a preview link** — if your changes are visually verifiable (UI,
   design, or any deployable artifact), add a link to the deployed preview or
   prototype in the PR description.
1. **Mark as ready for review** only once all steps above are complete.
1. **Resolve all CI checks** — CI runs after marking ready; do not request
   approval until all checks pass.

> [!WARNING]
> Do not merge without an approved review and passing CI checks.

### Review Process

#### Giving a Review

If a PR is not ready to merge, you **must** use **Request Changes** (reject). Do
not leave a plain comment when rejection is warranted — comments do not block
merging, are not recorded as rejections, and prevent the author from
re-requesting a review.

Use **Request Changes** (reject) for objective problems:

- PR doesn't solve the stated problem.
- A bug is introduced.
- Code style is inconsistent.
- Required guidelines are violated.

Use **Comment** for optional improvements or suggestions that should not block
the PR.

#### Scout Approach

When not actively working on a PR, look for PRs that need reviewers and offer
timely feedback to keep work moving.

#### Code Quality

Deliver bug-free software. Push back on subjective feedback — reviewers are a
final safety check, not a QA team.

---

[1]: https://chromewebstore.google.com/detail/wizard-browser-extension/gibcadmedmabfnfbolimcndljcopbhep
[2]: https://github.com/apps/holdex
