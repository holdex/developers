# Contributing Guidelines

Please read our [Code of Conduct](./CODE_OF_CONDUCT.md) to keep our community
approachable and respectful.

> [!TIP]
> You can use [Wizard GitHub App][2] and [Wizard Browser Extension][1] to
> simplify some of the workflows described in these Guidelines.

The enforceable conventions live in a [rules system](./rules/README.md): small
numbered `DEV-` files that each enforce one checkable behavior. This document is
the narrative guide over them, threading the rules with the workflow context.
When a rule and this guide ever disagree, the rule is the source of truth.

## Table of Contents

- [Getting started](#getting-started)
  - [Specs](#specs)
- [Communication Guidelines](#communication-guidelines)
- [PR Requirements](#pr-requirements)
  - [Review Process](#review-process)

## Getting started

There are three core contribution pillars:

1. **Goal**: a business aim
1. **Problem**: a barrier to achieving the Goal
1. **Solution**: the deliverable that resolves the Problem

Each pillar is enforced by rules in the [Contribution model](./rules/README.md)
category:

- [DEV-110](./rules/DEV-110.md): take ownership of a Goal
- [DEV-120](./rules/DEV-120.md): keep the Goal description to the allowed
  sections
- [DEV-130](./rules/DEV-130.md): understand and agree the Spec first
- [DEV-140](./rules/DEV-140.md): give an ETA once the goal is clear
- [DEV-150](./rules/DEV-150.md): map every barrier blocking the goal
- [DEV-160](./rules/DEV-160.md): write a clear Problem statement
- [DEV-170](./rules/DEV-170.md): deliver work as a pull request
- [DEV-180](./rules/DEV-180.md): keep the Spec as unimplemented behavior and
  graduate it

Goals can be managed with Wizard, which sets the ETA, attaches Google Documents,
and more. See the [Wizard commands](https://wizard.holdex.io/docs/commands), or
use the **Create Google Document** button in the GitHub sidebar
([Wizard Browser Extension][1]).

### Specs

A Spec describes the intended behavior for a Goal, not what currently exists but
what the Goal aims to deliver. It is a markdown file in `docs/specs/`, linked
from the Goal under `# Spec`. [DEV-180](./rules/DEV-180.md) governs how its
sections graduate into `docs/product/` as behavior ships:

```text
docs/specs/<feature>.md     ← only unimplemented sections
docs/product/<feature>.md   ← only what is currently shipped
```

#### Spec format

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

Sections are author-defined. Keep them user-focused and scoped to observable
behavior. Include a `## Design` section using the markup described in
[DEV-350](./rules/DEV-350.md) when the Goal has a design component.

#### Discussing a Spec

If the Spec PR is not yet merged, propose changes via review comments on that
PR. If the Spec is already merged, open a new PR against the spec file. Do not
use Goal issue comments for scope discussions; they belong in the Spec.

## Communication Guidelines

Two rules govern where discussion goes and how work is referenced:

- [DEV-210](./rules/DEV-210.md): route discussion to the right channel
- [DEV-220](./rules/DEV-220.md): reference issues and PRs as list items

## PR Requirements

> [!WARNING]
> PRs that do not meet these requirements will be rejected.

Before marking your PR ready for review, confirm each requirement, linked to the
rule that defines it:

- [ ] Commits are signed ([DEV-310](./rules/DEV-310.md))
- [ ] PR scope fits a few hours ([DEV-320](./rules/DEV-320.md))
- [ ] README and docs stay in sync ([DEV-330](./rules/DEV-330.md))
- [ ] Each fact lives in one canonical place ([DEV-335](./rules/DEV-335.md))
- [ ] New docs are indexed and reachable from the root
      ([DEV-337](./rules/DEV-337.md))
- [ ] The root README stays complete ([DEV-338](./rules/DEV-338.md))
- [ ] Title follows `type(scope): action` ([DEV-340](./rules/DEV-340.md))
- [ ] Design PRs carry a Design section ([DEV-350](./rules/DEV-350.md))
- [ ] Marked ready only when complete, CI passing
      ([DEV-365](./rules/DEV-365.md))
- [ ] Time is reported ([DEV-370](./rules/DEV-370.md))
- [ ] The PR is linked to its Problem ([DEV-360](./rules/DEV-360.md))
- [ ] Spec sections graduated to `docs/product/` ([DEV-180](./rules/DEV-180.md))
- [ ] Markdown lint passes on push ([DEV-380](./rules/DEV-380.md))
- [ ] User-facing docs updated in the same PR ([DEV-390](./rules/DEV-390.md))

### Review Process

- [DEV-410](./rules/DEV-410.md): reject with Request Changes for objective
  problems
- [DEV-415](./rules/DEV-415.md): re-request review explicitly after addressing
  changes
- [DEV-420](./rules/DEV-420.md): scout open PRs when idle
- [DEV-430](./rules/DEV-430.md): deliver bug-free work; review is a safety check

---

[1]: https://chromewebstore.google.com/detail/wizard-browser-extension/gibcadmedmabfnfbolimcndljcopbhep
[2]: https://github.com/apps/holdex
