# Writing Rules

A **rules system** is a set of small, numbered files that each enforce one
operating behavior, applied as a checklist against a real subject.

This document is the shared standard for authoring such a rule. It is
independent of any particular rules system: anything system-specific, such as
the numbering prefix, extra frontmatter, or how rules are grouped, is defined by
that system's own rules index, not here.

## What a rule is

A rule captures **one enforceable behavior** that you can check against a given
subject. If you cannot write a pass or fail acceptance check for it, it is not a
rule yet. It is a note or a principle.

Keep one behavior per file. Do not bundle several unrelated behaviors into one
rule, and do not split one behavior across several rules.

## File layout

One rule per file, named by its ID: a short system prefix and a number (for
example `ABC-010.md`). Each file is frontmatter followed by a body.

### Frontmatter

These fields are shared across every rules system:

| Field | Meaning |
| --- | --- |
| `id` | Rule ID, matches the filename |
| `title` | Short, human-readable behavior name |
| `status` | Lifecycle, for example `active` |
| `enforcement` | How the rule is enforced, for example `manual` |
| `severity` | `error` or `warning` |
| `depends_on` | Rule IDs that must hold before this one applies |

A rules system may add its own fields (for example a stage and an ordering).
Those are documented in that system's rules index, not here.

## Body structure

The body follows a fixed shape:

```md
## Title

### Problem

### Solution

#### Acceptance Criteria
```

- **Problem**: what is broken, or what someone cannot do because of it. Frame it
  as a job story, the same way Problem issues are framed in the
  [Contributing Guidelines](./CONTRIBUTING.md).
- **Solution**: the behavior to follow, stated plainly. Reference related rules
  by ID where one depends on or informs another.
- **Acceptance Criteria**: a checkable list. A reviewer should be able to run
  each item against a real subject and get a clear pass or fail.

## Cross-references

- Reference another rule by its ID as a link, so dependencies are traceable.
- For issue and PR references, use the list-item format defined in the
  [Contributing Guidelines](./CONTRIBUTING.md#referencing-issues-and-prs).
- **Link style is governed by each repo's own `rumdl` config, not by this
  document.** Some repos require reference-style links and reject inline ones.
  Run the repo's markdown lint before pushing rather than assuming a style.

## Naming the PR

A rule PR follows the same user-facing `type(scope): action` convention as any
other PR: describe what someone can now do, not what you wrote. See
[Naming](./CONTRIBUTING.md#naming) in the Contributing Guidelines.
