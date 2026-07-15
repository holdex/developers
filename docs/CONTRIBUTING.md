# Contributing Guidelines

Please read our [Code of Conduct](./CODE_OF_CONDUCT.md) to keep our community
approachable and respectful.

> [!TIP]
> You can use [Wizard GitHub App][2] and [Wizard Browser Extension][1] to
> simplify some of the workflows the rules describe.

How to contribute is defined by the [rules system](./rules/README.md): small
numbered `DEV-` files that each enforce one checkable behavior, grouped into
authoring, contribution model, communication, PR requirements, and review. That
index is the canonical guide, so start there. This file stays a thin pointer so
it does not repeat, and drift from, the rules.

## Specs

A Spec describes the intended behavior for a Goal, not what currently exists but
what the Goal aims to deliver. It is a markdown file in `docs/specs/`, linked
from the Goal under `# Spec`. [DEV-180](./rules/DEV-180.md) governs how its
sections graduate into `docs/product/` as behavior ships:

```text
docs/specs/<feature>.md     ← only unimplemented sections
docs/product/<feature>.md   ← only what is currently shipped
```

### Spec format

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

### Discussing a Spec

If the Spec PR is not yet merged, propose changes via review comments on that
PR. If the Spec is already merged, open a new PR against the spec file. Do not
use Goal issue comments for scope discussions; they belong in the Spec.

---

[1]: https://chromewebstore.google.com/detail/wizard-browser-extension/gibcadmedmabfnfbolimcndljcopbhep
[2]: https://github.com/apps/holdex
