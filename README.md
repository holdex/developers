# Developer Guidelines

Welcome! Your journey to shape the future of AI and Fintech starts here. Start
with the [Guidelines index](./docs/README.md) to reach the contributing guide,
the developer rules, and the rest.

Subscribe to repository notifications to stay updated with frequent fixes and
improvements.

## Setup

### Local

After cloning, run `npm install` once to install the pinned `rumdl` version and
enable the markdown lint and rules-audit checks on commit (`postinstall` runs
`lefthook install`). The hooks live in `lefthook.yml`, and CI runs the same
file. To skip them once, run `LEFTHOOK=0 git commit`; CI still checks.

### Stage / Preview

This repository is documentation, not a deployed service. Open a pull request to
preview changes: reviewers read the rendered markdown on the PR branch before it
merges.

### Production

The `main` branch is the published source of truth, and merged changes are live
for the whole organization immediately. There is no separate hosting to deploy.

## Skills and plugins

The workflows live as standard Agent Skills in `skills/`, and the repository
itself is packaged as a plugin, so any supported tool can install them.

Any coding agent — Claude Code, Codex, Cursor, OpenCode, Copilot, and more:

```bash
npx skills add holdex/developers
```

Add `-g` to install them globally for every repo you work in, and run
`npx skills update` to pick up changes after pulling the repo.

Claude Code, as a plugin from the built-in marketplace:

```bash
claude plugin marketplace add holdex/developers
claude plugin install holdex@holdex
```

Each skill then runs as `/holdex:<skill-name>`, with the bare `/<skill-name>`
working when no other command claims it.

Cursor, from the repository: open Customize and import `holdex/developers` as a
marketplace, then install the `holdex` plugin from it.

The repository is also a conformant Agent Plugin (a root `plugin.json` following
the [Agent Plugins](https://agent-plugins.org) open standard), so any other
spec-conformant tool can install it directly. Available skills:

| Skill | When to use |
| --- | --- |
| `holdex-contributing` | Before creating or updating a GitHub issue or PR in any Holdex repository |
| `report-bug` | Post the bug attribution comment a `fix` PR needs before review |
| `submit-time` | Record time spent on a pull request |
