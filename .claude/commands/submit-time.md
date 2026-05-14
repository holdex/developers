Post a `@holdex pr submit-time` comment on a pull request to record time spent.

## Input

Time is provided as `$ARGUMENTS` (e.g. `2h30m`, `1h`, `45m`, `1.5h`).

If `$ARGUMENTS` is empty, ask the user for the time before proceeding.

Validate the format — accepted patterns: `15m`, `1h`, `2h30m`, `1.5h`. If the format is invalid, tell the user and stop.

## Resolve the PR

Detect the current PR from the git worktree:

```bash
gh pr list --head "$(git branch --show-current)" --json number,url,title --limit 1
```

If no PR is found for the current branch, ask the user for the PR number or URL.

## Post the comment

```bash
gh pr comment <PR_URL> --body "@holdex pr submit-time $ARGUMENTS"
```

Confirm the comment was posted and show the PR URL.
