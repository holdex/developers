# Contributing Guidelines

Thank you for your interest in contributing to our project! Your accepted
contributions will be reflected in our repositories and related websites.

Please read our [Code of Conduct](./CODE_OF_CONDUCT.md) to keep our community
approachable and respectful.

> [!TIP]
> You can use [Wizard Github App][2] and [Wizard Browser Extension][1] to
> simplify some of the workflows described in these Guidelines.

## Table of Contents

- [Getting started](#getting-started)
  - [Goal](#goal)
  - [Problem](#problem)
  - [Solution](#solution)
- [Communication Guidelines](#communication-guidelines)
- [PR Requirements](#pr-requirements)
  - [Commit Signature Verification](#commit-signature-verification)
  - [Scoping](#scoping)
  - [Naming](#naming)
  - [PR Lifecycle](#pr-lifecycle)
  - [Review Process](#review-process)
- [Referral Program](#referral-program)

## Getting started

There are three core contribution pillars:

1. **Goal** – a business aim
1. **Problem** – an issue that is on our way to achieving the Goal
1. **Solution** – the actual deliverable which resolves the problem

> [!NOTE]
> In this guide you will get an overview of the contribution workflow: from
> finding a Goal, identifying a Problem, and the process of delivering your
> solutions.

### Goal

Understanding the Goal and its business context is crucial for successful
contribution.

To find a Goal to work on, browse GitHub Issues in the relevant repository and
filter for issues with the `Goal:` prefix. Prioritize issues based on their
impact and urgency. If you are unsure which Goal to choose, please consult
your lead. Pick one that matches your skills, then proceed with the steps below.

As soon as you get involved, you must:

1. assign yourself to the Goal issue.
1. analyze specifications (the Specs),
1. assess progress and outstanding Problems and
1. provide an estimated time of achieving (ETA) the Goal.

Each Goal description must include Specs (a Google Document with commenting
permissions) and an ETA.

> [!NOTE]
> A Goal is represented as a GitHub issue in the relevant repository and has the
> following naming pattern: `Goal: [statement]`.  
> Goals are created and managed by Partner level contributors.

### Problem

Once a Goal is clear, you must identify what prevents its achievement.
Anything that acts as a barrier is considered a "Problem." Ask yourself:
"Why is this Goal not achieved, and what specifically is the problem?"

> [!NOTE]
> Report each Problem as a [GitHub Issue](https://docs.github.com/en/issues)
> using the naming pattern: `Problem: [statement]`. Keep the name short
> (under 65 characters) and crystal clear.

The statement must be a **job story** — describe what a specific user **cannot
do** or what is broken for them. Ask: _"What can [user] not do because of this
problem?"_

| **Good** ✅                                    | **Bad** ❌                                   | **Why?**                       |
| ---------------------------------------------- | -------------------------------------------- | ------------------------------ |
| `operators can't view their account balance`   | `operators don't have their account balance` | Describes inability, not state |
| `users can't submit a form without refreshing` | `form submission issue`                      | Vague, no actor or action      |
| `admins can't export reports as CSV`           | `CSV export missing`                         | No subject, not a job story    |

Ensure each Problem issue is properly interlinked with its parent Goal issue:

- Add the Problem issue link to the Goal description.
- Add the Goal issue link to the Problem description.

### Solution

The third pillar of successful contribution is the Solution.

Different problems may require different sets of skills.  
Whether it's code, design, or marketing material, we expect a lean and clean
solution from the contributor.

> [!NOTE]
> Solution is presented in GitHub as a
> [Pull Request (PR)](https://docs.github.com/en/pull-requests) in compliance
> with [PR Requirements](#pr-requirements).

## Communication Guidelines

### Discussion channels

Direct discussions to the appropriate channel at all times:

- **Spec document** — clarifications about Goal scope or business context
- **Problem issues** — tracking obstacles that prevent achieving the Goal
- **Goal issues** — linking Specs, tracking Problems, and monitoring progress
  only

> [!IMPORTANT]
> Do not post Problem status updates, PR notifications, or progress updates in
> Goal issues. The Goal → Problem → PR chain makes these redundant and adds
> noise.

If you identify a potential new problem but are unsure whether it is planned:

1. Check if there is an existing Problem issue related to your concern.
1. If not, ask for clarification in the Spec document.
1. If necessary, create a new Problem issue and discuss it there.

If someone's action is required to unblock progress, assign them to the Goal
issue so the dependency is visible.

### Referencing issues and PRs

When referencing issues or pull requests, use a list item format to enable
automatic title rendering and improve readability. This ensures that GitHub
automatically expands the reference to show the issue/PR title.

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

All PRs, whether for source code, design, or copy changes, must comply with the
following requirements.

> [!WARNING]
> PRs that do not correspond to the following criteria are usually rejected.

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

### Commit Signature Verification

For the security and integrity of our project, we require all contributors to
sign their commits.  
For detailed instructions on why and how to sign your commits refer to
[GitHub's documentation on commit signature verification](https://docs.github.com/en/authentication/managing-commit-signature-verification/about-commit-signature-verification).

> [!NOTE]
> We recommend signing commits using an
> [SSH key](https://docs.github.com/en/authentication/managing-commit-signature-verification/about-commit-signature-verification#ssh-commit-signature-verification).
> Ensure your Git version supports SSH signature verification (Git 2.34 or
> later).

### Scoping

> [!TIP]
> Here's a [good resource](https://youtu.be/bmSAYlu0NcY?si=2lLQeY1PGCY9tcvX) on software design philosophy.

When planning the scope of work, make sure you
[keep PRs small](https://artsy.github.io/blog/2021/03/09/strategies-for-small-focused-pull-requests/).
You must be able to complete your PR within 3–4 hours.  
If the solution requires more time, then decompose it into smaller independent
PRs. In case your smaller PRs can't be used on production, use feature flags.

We usually reject and close PRs which do not have activity for the last 24
hours, unless there is a clear comment explaining the reason why that PR is
stalled.

When introducing functional changes, cross-check the README and update it in
the same PR. If your change affects anything documented there — setup steps,
environment requirements, file references — the README must stay in sync.

### Naming

> [!NOTE]
> We use PR titles to communicate changes to all stakeholders, including
> non-technical users.

PR names must be:

1. **User-focused**: Describe what users gain, not technical implementation
1. **Follow [Conventional Commits](https://www.conventionalcommits.org)**
1. **Clear & simple** (present tense, action-oriented)

| **Good Examples** ✅   | **Bad Examples** ❌            | **Why?**           |
| ---------------------- | ------------------------------ | ------------------ |
| `feat(ui): play music` | `Create player`                | Missing scope/type |
| `fix(sdk): mute sound` | `Fix: add file to mute sound`  | Technical details  |
| `test(api): open door` | `Feat: modified door function` | Vague, past tense  |

A feature isn't a button, toggle, or handler — it's
**what the user gains from it**. Ask _"What will users be able to do?"_ not
_"What am I building?"_

1. **Replace UI labels with actions**: Wrong: "Add dropdown for filters" →
   Correct: "Filter search results by category"
1. **Describe outcomes, not components**: Wrong: "Fix API error handling" →
   Correct: "Gracefully recover from connection errors"
1. **Use user action verbs**: _View, Play, Customize, Save_, etc.

#### Before Submitting, Ask

1. Does it use `type(scope [Optional]): action` format?
1. Could a non-technical user understand the benefit?
1. Is it in the present tense?
1. Does it focus on user capability (not code)?

#### Design PRs

Design PRs use `docs(ui)` as the type and scope. e.g.: `docs(ui): design table component`

Initiate a PR with a note in the DESIGN.md file detailing the addressed design
aspects. Structure the design file with the following markup:

```text
## Feature
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
## Credit Vaults
- [/lending](https://figma.com/your-design-file-url)
  - ./vaults/{poolAddr}
    - (Auction)
      - [[Withdraw Popup]](https://figma.com/your-design-file-url)
      - [[Bid Popup]](https://figma.com/your-design-file-url)
```

If there isn't an existing DESIGN.md file, create one and link it from README.md.

### PR Lifecycle

Follow these steps in order from start to submission:

1. **Open a [draft
   PR](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests#draft-pull-requests)**
   right away when you start working on a Problem.
1. **[Link the
   PR](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue#linking-a-pull-request-to-an-issue-using-a-keyword)**
   to the corresponding Problem issue using a closing keyword.
1. **Assign yourself** so it is clear who is working on it.
1. **Resolve all CI checks** — PRs with failing checks will be rejected.
1. **Report your time** spent across all stages: planning (40%), implementation,
   and QA (20–30%). Open the PR early so time tracking starts from the
   beginning, including investigation.
1. **Assign at least one reviewer** (team or individual).
1. **Include a preview link** — if your changes are visually verifiable (UI,
   design, or any deployable artifact), add a link to the deployed preview or
   prototype in the PR description.
1. **Mark as ready for review** only once all steps above are complete.

> [!NOTE]
> Do not merge without an approved review.

### Review Process

#### Giving a Review

If a PR is not ready to merge, you **must** use **Request Changes** (reject).
Do not leave a plain comment when rejection is warranted — comments do not
block merging, are not recorded as rejections, and prevent the author from
re-requesting a review.

Use **Request Changes** (reject) for objective problems:

- PR doesn't solve the stated problem.
- A bug is introduced.
- Code style is inconsistent.
- Required guidelines are violated.

Use **Comment** for optional improvements or suggestions that should not block
the PR.

#### Scout Approach

If you ever have free time, be proactive and apply the scout approach: own the
job, look for PRs that still need reviewers, and offer timely feedback so work
keeps moving.

#### Code Quality

Aim for solutions that work correctly 99.9% of the time. Be independent and
thorough in your QA — reviewers are not QA team members but are there for a
final safety check. We expect contributors to deliver bug-free software,
understanding that perfection is an ideal. Stand firm in your solutions and
avoid unnecessary revisions based on subjective feedback.

## Referral Program

Referrals are accepted for two types:

- **Contributors** — someone you refer who joins and stays active for more than
  3 months.
- **Business** — a client or partner you refer who engages with us.

In both cases, for a referral to be registered, the applicant or prospect must
name you as the referral at the time of their application or first contact.
Referrals claimed after the fact will not be counted.

Once the eligibility conditions are met, reach out to your lead to claim the
reward.

> [!IMPORTANT]
> This referral program applies unless there is a separate commercial
> engagement between Holdex and the contributor, in which case referral terms
> are governed by that agreement instead.

---

[1]: https://chromewebstore.google.com/detail/wizard-browser-extension/gibcadmedmabfnfbolimcndljcopbhep
[2]: https://github.com/apps/holdex
