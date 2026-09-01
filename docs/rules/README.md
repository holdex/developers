# Developer Rules

The org-wide contribution conventions as a **rules system**: small numbered
files that each enforce one checkable behavior.

Rules are grouped by category. Each `DEV-` rule enforces one behavior and
carries acceptance criteria you can check. The Rule Authoring category doubles
as the shared standard that any other rules system can adopt.

## Categories

Rules are numbered by category: DEV-0xx Rule Authoring, DEV-1xx Planning,
DEV-2xx Communication, DEV-3xx PR requirements, DEV-4xx Review, DEV-5xx
Advocacy. Planning, PR requirements, and Review are stages of the same
contribution, not competing definitions of it.

### 0. Rule Authoring

How to write a rule. These rules define the shape every other rule follows,
including their own. Not to be confused with authoring a contribution itself,
that is Planning, PR requirements, and Review below.

- [DEV-010](./DEV-010.md): enforce one behavior per rule file
- [DEV-020](./DEV-020.md): structure a rule as Problem, Solution, Acceptance
  Criteria
- [DEV-030](./DEV-030.md): carry the shared rule frontmatter
- [DEV-040](./DEV-040.md): reference a rule by ID as a followable link
- [DEV-050](./DEV-050.md): keep the Problem statement short

### 1. Planning

How work flows from a business aim to a delivered change: Goal, Problem,
Solution, Spec.

- [DEV-110](./DEV-110.md): take ownership of a Goal
- [DEV-120](./DEV-120.md): keep the Goal description to the allowed sections
- [DEV-125](./DEV-125.md): write a Spec in the standard format
- [DEV-130](./DEV-130.md): understand and agree the Spec first
- [DEV-140](./DEV-140.md): give an ETA once the goal is clear
- [DEV-150](./DEV-150.md): map every barrier blocking the goal
- [DEV-155](./DEV-155.md): log a bottleneck as a Problem and design it out
- [DEV-160](./DEV-160.md): write a Problem issue stakeholders can act on
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
- [DEV-330](./DEV-330.md): keep docs in sync
- [DEV-335](./DEV-335.md): keep each fact in one canonical place
- [DEV-337](./DEV-337.md): index every docs tree from a README
- [DEV-338](./DEV-338.md): give the repository a complete root README
- [DEV-340](./DEV-340.md): name a PR for what users gain
- [DEV-350](./DEV-350.md): mark a design PR docs(ui) with a Design section
- [DEV-360](./DEV-360.md): open work as a draft PR linked to its Problem
- [DEV-365](./DEV-365.md): mark a PR ready only when it is complete
- [DEV-370](./DEV-370.md): report time across all stages
- [DEV-380](./DEV-380.md): enforce markdown lint on push with a pinned rumdl
  hook
- [DEV-390](./DEV-390.md): update user-facing docs in the same PR

### 4. Review

How to review, and the quality bar work is held to.

- [DEV-410](./DEV-410.md): reject with Request Changes for objective problems
- [DEV-415](./DEV-415.md): re-request review explicitly after addressing changes
- [DEV-420](./DEV-420.md): scout open PRs when idle
- [DEV-430](./DEV-430.md): deliver bug-free work; review is a safety check
- [DEV-440](./DEV-440.md): judge work by value delivered, not effort spent

### 5. Advocacy

How members represent Holdex in public.

- [DEV-510](./DEV-510.md): set up your public profiles for Holdex
- [DEV-520](./DEV-520.md): advocate for Holdex across public channels
