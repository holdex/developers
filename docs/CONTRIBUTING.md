# Contributing Guidelines

Thank you for your interest in contributing to our project! Your accepted
contributions will be reflected in our repositories and related websites.

Please read our [Code of Conduct](./CODE_OF_CONDUCT.md) to keep our community
approachable and respectful.  
If you are a permanent contributor, read our [Principles](./PRINCIPLES.md).

> [!TIP]
> You can use [Wizard Browser Extension](https://chromewebstore.google.com/detail/github-wizard/gibcadmedmabfnfbolimcndljcopbhep?) to simplify some of the workflows described in these Guidelines.

## Getting started

There are three core contribution pillars:

1. **Goal** – a business aim
1. **Problem** – an issue that is on our way to achieving the Goal
1. **Solution** – the actual deliverable which resolves the problem

> [!NOTE]
> In this guide you will get an overview of the contribution workflow: from finding a Goal, identifying a Problem, and the process of delivering your solutions.

### Goal

Understanding the Goal and its business context is crucial for successful
contribution.

As soon as you get involved, you must:

1. analyze specifications (the Specs),
1. assess progress and outstanding Problems and
1. provide an estimated time of achieving (ETA) the Goal.

Each Goal description must include Specs (a Google Document with commenting
permissions) and an ETA.

> [!NOTE]
> A Goal is represented as a GitHub issue in the relevant repository and has the following naming pattern: `Goal: [statement]`.  
> Goals are created and managed by Partner level contributors.

#### Communication within Goal issues

To maintain clarity and efficiency, discussions should be directed to the
appropriate channels:

- **Use the Spec document** for clarifications about the Goal, its scope, or
  business context.
- **Use Problem issues** for tracking obstacles that prevent achieving the Goal.
- **Goal issues should remain clean**, primarily linking Specs, tracking
  Problems, and monitoring progress.

If you identify a potential new problem but are unsure whether it is planned:

1. First, check if there is an existing Problem issue related to your concern.
1. If there isn't, ask for clarification in the Spec document.
1. If necessary, create a new Problem issue and discuss it there.

Avoid extended discussions in Goal issues. Instead, move conversations to the
relevant Spec document or Problem issue.

### Problem

Once the Goal is clear, you must identify what stops you from achieving it.
Anything that is stopping you - is a “Problem”. A typical question to ask is:
"Why is this Goal not achieved and what is the Problem?".

Sometimes, a Goal already has a few identified problems, but not always.

> [!NOTE]
> Once a Problem is identified, we report it as a [GitHub Issue](https://docs.github.com/en/issues) with the following naming pattern: `Problem: [statement]`.  
> We’re counting on our contributors to identify problems. Keep a Problem name short (under 65 chars) and crystal clear.

Make sure each Problem issue is interlinked with it's Goal issue:

- add a Problem issue link into the Goal description
- add a Goal issue link to the Problem description

It's essential to maintain clear links between Goals and related Problem issues.
This helps everyone stay informed and team members can easily track progress and
understand the context.

### Solution

The third pillar of successful contribution is the Solution.

Different problems may require different sets of skills.  
Whether it’s code, design, or marketing material, we expect a lean and clean
solution from the contributor.

> [!NOTE]
> Solution is presented in GitHub as a [Pull Request (PR)](https://docs.github.com/en/pull-requests) in compliance with [PR Requirements](#pr-requirements).

### Referencing

When referencing issues or pull requests in any GitHub discussion, use a list
item format to enable automatic title rendering and improve readability. This
ensures that GitHub automatically expands the reference to show the issue/PR
title.

#### Correct Format

Use a list item to reference issues or PRs:

```md
See these related items:

- <issue_or_pr_url>
- <another_issue_or_pr_url>
- #4
- #12
```

#### Incorrect Formats

Avoid simply pasting the URL inline.

```md
Check this out: <issue_or_pr_url>
Related: <issue_or_pr_url>
See <issue_or_pr_url> for details
```

> [!NOTE]
> The list format improves readability and helps contributors quickly understand the context by showing the referenced issue/PR titles automatically.

## PR Requirements

All PRs, whether for source code, design, or copy changes, must comply with our
PR Requirements.

> [!WARNING]
> PRs that do not correspond to the following criteria are usually rejected.

## Commit Signature Verification

For the security and integrity of our project, we require all contributors to
sign their commits.  
For detailed instructions on why and how to sign your commits refer to
[GitHub's documentation on commit signature verification](https://docs.github.com/en/authentication/managing-commit-signature-verification/about-commit-signature-verification).

> [!Note]
> We recommend signing commits using an [SSH key](https://docs.github.com/en/authentication/managing-commit-signature-verification/about-commit-signature-verification#ssh-commit-signature-verification). Ensure your Git version supports SSH signature verification (Git 2.34 or later).

## Scoping

> [!NOTE]
> Here's a [good resource](https://youtu.be/bmSAYlu0NcY?si=2lLQeY1PGCY9tcvX) on software design philosophy.

When planning the scope of work, make sure you
[keep PRs small](https://artsy.github.io/blog/2021/03/09/strategies-for-small-focused-pull-requests/).
You must be able to complete your PR within 3-4 hours.  
If the solution requires more time, then decompose it into smaller independent
PRs. In case your smaller PRs can't be used on production, use feature flags.

We usually reject and close PRs which do not have activity for the last 24
hours, unless there is a clear comment explaining the reason why that PR is
stalled.

## CI Checks

To maintain the quality and integrity of our project, all PRs must successfully
pass the required Continuous Integration (CI) checks before being marked as
"ready to review." PRs with failing CI checks will be rejected.

The required checks are as follows:

```text
- The pr-time-tracker verifies that the time spent on the PR has been properly logged.
- The pr-time-tracker for bugs ensures that bug-related time tracking is correctly linked to the corresponding commit and bug author.
- The code-rabbit validates that the code meets quality standards and passes all automated checks.
```

> [!NOTE]
> Contributors need to resolve all CI issues before assigning reviewers or requesting a review. Any PR with unresolved CI checks should remain in "draft" status until all issues are fixed.

## Drafting

When starting to work on a Problem, you must:

1. Open a
   [draft PR](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests#draft-pull-requests)
   right away. Do not mark PR as "ready to review" unless you are confident it
   is ready.
1. [Link opened PR](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue#linking-a-pull-request-to-an-issue-using-a-keyword) to the corresponding Problem (issue).
1. Before marking your PR as ready for review, assign **at least one reviewer**
   (team or individual). Do not merge without approved review.

### Design PRs

Initiate a PR with a note in the DESIGN.md file detailing the addressed design
aspects. Design PRs use `docs(ui)` as the "type" and "scope" of its name. i.e.:
`docs(ui): design table component`

Structure the design file with the following markup:

```text
## Feature
- [/page](https://figma.com/your-design-file-url)
  - ./page/{params}
    - (group)
      - [[state]](https://figma.com/your-design-file-url)
```

#### Key

- **`/...`** - Represents a page.
- **`{...}`** - Represents a dynamic parameter within a URL.
- **`(...)`** - Used for grouping related features or components.
- **`[...]`** - Indicates a specific state of the page or component, such as a
  popup or modal state.

- Indentation in the list represents the tree structure or hierarchy, showing
  how components or features are nested or related.

Example:

```text
## Credit Vaults
- [/lending](https://figma.com/your-design-file-url)
  - ./vaults/{poolAddr}
    - (Auction)
      - [[Withdraw Popup]](https://figma.com/your-design-file-url)
      - [[Bid Popup]](https://figma.com/your-design-file-url)
```

If there isn't an existing DESIGN.md file:

1. Create a new file named DESIGN.md.
1. Link it from README.md.

## Naming

> [!NOTE]
> We use PR titles to communicate changes to all stakeholders, including non-technical users.

PR names must be:

1. **User-focused**: Describe what users gain, not technical implementation
1. **Follow [Conventional Commits](https://www.conventionalcommits.org)**
1. **Clear & simple** (present tense, action-oriented)

### Example Comparison

| **Good Examples** ✅   | **Bad Examples** ❌            | **Why?**           |
| ---------------------- | ------------------------------ | ------------------ |
| `feat(ui): play music` | `Create player`                | Missing scope/type |
| `fix(sdk): mute sound` | `Fix: add file to mute sound`  | Technical details  |
| `test(api): open door` | `Feat: modified door function` | Vague, past tense  |

---

### Key Principles

#### What to Focus On

A feature isn’t a button, toggle, or handler—it’s
**what the user gains from it**. Ask:

- ❌ _"What am I building?"_ → Leads to technical labels.
- ✅ _"What will users be able to do?"_ → Leads to clear value.

#### Why It Matters

- **Clarity**: Engineers, PMs, and stakeholders instantly understand the impact.
- **Consistency**: Aligns with product-facing language (release notes, docs).
- **User-Centricity**: Work is driven by user needs, not just code changes.

#### How to Apply It

1. **Replace UI labels with actions**: Wrong: "Add dropdown for filters" →
   Correct:"Filter search results by category"
1. **Describe outcomes, not components**: Wrong: "Fix API error handling" →
   Correct:"Gracefully recover from connection errors"

1. **Use user action verbs**: _View, Play, Customize, Save_, etc.

### Before Submitting, Ask

1. Does it use `type(scope [Optional]): action` format?
1. Could a non-technical user understand the benefit?
1. Is it in the present tense?
1. Does it focus on user capability (not code)?

## Requesting Review

Once your PR is ready, assign reviewers and mark it as "ready to review." But
before that, report the time you have spent on it.

> [!NOTE]
> When contributing, it's essential to report time accurately, including all stages of development (planning, implementation, QA). We encourage opening a PR at the start of your work, even during the planning or investigation phase. Programming and designing isn't just about writing code or creating designs; it also involves planning (40%) and QA (20-30%).

### Reviewing PRs

Use **Request Changes** (reject) only for objective problems:

- PR doesn't solve the stated problem.
- A bug is introduced.
- Code style is inconsistent.
- Required guidelines are violated.

Use **Comment** for optional improvements or suggestions.

### Scout approach

If you ever have free time, be proactive and apply the scout approach: own the
job, look for PRs that still need reviewers, and offer timely feedback so work
keeps moving.

### Code Quality and Reviews

Aim for solutions that work correctly 99.9% of the time. Be independent and
thorough in your QA - reviewers are not QA team members but are there for a
final safety check. We expect contributors to deliver bug-free software,
understanding that perfection is an ideal. Stand firm in your solutions and
avoid unnecessary revisions based on subjective feedback.
