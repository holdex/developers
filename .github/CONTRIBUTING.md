# Contributing Guidelines

Thank you for your interest in contributing to our project! Accepted contributions will be reflected on [holdex.io](https://holdex.io) or other related websites and repositories. 

Please read our [Code of Conduct](./CODE_OF_CONDUCT.md) to keep our community approachable and respectable.

## Getting started

There are 3 core contribution pillars:
1. **Goal** – a business aim
1. **Problem** – an issue that is on the way to help us achieve the goal
1. **Solution** –  the actual deliverable which resolves the problem

> [!NOTE]
> In this guide you will get an overview of the contribution workflow: from finding a Goal, identifying a Problem, and the process of delivering your solutions.

### Goal

As soon as you get involved, you must understand the goal you are working on by

1. investigating the conversations and related documents
1. understanding how things are already moving towards achieving the goal 

It is crucial to understand the business context of the goal and how achieving the goal will impact the project.

> [!NOTE]
> A Goal is represented as a GitHub issue in the relevant repository and has the following naming pattern: `Goal: [statement]`. Goals are created and managed by Partner level contributors.

### Problem

Once the goal is clear, you must identify what stops us from achieving it. Anything that is stopping us - is a “Problem”. A typical question to ask is: "why this Goal is not achieved yet and what is the Problem?".

Sometimes, a Goal already has a few identified problems, but it’s not always the case.

> [!NOTE]
> Once a Problem is identified, we report it as a [GitHub Issue](https://docs.github.com/en/issues) with the following naming pattern: `Problem: [statement]`. We’re counting on our contributors to identify problems. Keep a Problem name short (under 65 chars) and crystal clear. 

### Solution

The third pillar of successful contribution is the Solution.

Different problems may require different sets of skills.  
Whether it’s code, design, or marketing material, we expect a lean and clean solution from the contributor.

> [!NOTE]
> Here's a [good resource](https://youtu.be/bmSAYlu0NcY?si=2lLQeY1PGCY9tcvX) on software design philosophy
>

> [!NOTE]
> Code and design solution is presented as [GitHub PR (Pull Request)](https://docs.github.com/en/pull-requests). All PRs, whether for source code or design changes, must comply with our PR Requirements.
> 

# PR Requirements

> [!WARNING]
> PRs that do not correspond to the following criteria are usually rejected.

## Scoping
When planning the scope of work, make sure you [keep PRs small](https://artsy.github.io/blog/2021/03/09/strategies-for-small-focused-pull-requests/). You must be able to complete your PR within 3-4 hours.  
If the solution requires more time, then decompose it into smaller independent PRs. In case your smaller PRs can't be used on production, use feature flags.

We usually reject and close PRs which do not have activity for the last 24 hours, unless there is a clear comment explaining the reason why that PR is stalled.

## Drafting
When start working on a Problem, you must open a [draft PR](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests#draft-pull-requests) right away. Do not mark PR as "ready to review" unless you are confident it is ready.

When creating a PR, you must [link it](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue#linking-a-pull-request-to-an-issue-using-a-keyword) to the corresponding Problem (issue).

### Design PRs

Initiate a PR with a note in the DESIGN.md file detailing the design aspects being addressed. 
Design PRs use `docs(ui)` as the "type" and "scope" of its name. I.e.: `docs(ui): design table component`

```
# Design Assets
- [Name of Page](_link_to_figma_canvas)
```

If there isn't an existing DESIGN.md file:

1. Create a new file named DESIGN.md.
1. Link it from README.md.

## Naming
When naming your PRs and commits follow [Conventional Commit](https://www.conventionalcommits.org) guidelines.  
Keep it [clean and simple](https://pulsar.apache.org/contribute/develop-semantic-title/#how-to-write-good-pr-titles).

## Requesting Review
Once your PR is ready, assign reviewers and mark it as "ready to review". But before that, make sure to report the time you have spent on the PR.

> [!NOTE]
> When contributing, it's essential to report time accurately, including all stages of development (planning, implementation, QA). We encourage opening a PR at the start of your work, even during the planning or investigation phase. Programming and designing isn't just about writing code or creating designs; it also involves planning (40%) and QA (20-30%). 
> 

#### Code Quality and Reviews

Aim for solutions that work correctly 99.9% of the time. Be independent and thorough in your QA - reviewers are not QA team members but are there for a final safety check. We expect contributors to deliver bug-free software, understanding that perfection is an ideal. Stand firm in your solutions and avoid unnecessary revisions based on subjective feedback.

# Support 
https://discord.gg/JswagFgdR9
