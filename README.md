# Developer Guidelines

Welcome to our Developer Guidelines! Your journey to shape the future of AI and Fintech
starts here.

## For Developers

_Developers_ are everyone creating value: business developers, designers,
engineers, marketers, and beyond. We build businesses, products, partnerships,
customer relationships, processes, and delivery methods, crafting the future we
envision.

Everything is indexed from the [documentation index](./docs/README.md): start
there to reach the contributing guide, the developer rules, and the rest.

Subscribe to repository notifications to stay updated with frequent fixes and
improvements.

## Setup

### Local

After cloning, run `npm install` once to install the pinned `rumdl` version and
enable the markdown lint and rules-audit checks on push (`postinstall` sets
`core.hooksPath` to `.githooks` automatically).

### Stage / Preview

This repository is documentation, not a deployed service. Open a pull request to
preview changes: reviewers read the rendered markdown on the PR branch before it
merges.

### Production

The `main` branch is the published source of truth, and merged changes are live
for the whole organization immediately. There is no separate hosting to deploy.

## Claude Code Skills

Clone this repository locally and symlink the commands directory to make all
skills available globally across every repo you work in:

```bash
ln -s /path/to/holdex/developers/.claude/commands ~/.claude/commands
```

Skills stay up to date automatically as you pull the repo. Available skills:

| Command | When to use |
| --- | --- |
| `/holdex-contributing` | Before creating or updating a GitHub issue or PR in any Holdex repository |
