Post a `@holdex bug commit` or `@holdex bug dispute` comment on a pull
request to attribute the commit and author that introduced a bug.

**Required for every PR whose title starts with `fix` (Conventional
Commits type).** A `fix` PR is not ready for review until this comment is
posted — it's how the original bug source gets attributed.

## Input

`$ARGUMENTS` holds the commit URL and the GitHub handle of the commit's
author, optionally prefixed with `dispute` to correct a previous report
instead of filing a new one:

- `<commit-url> @<github-handle>` — report the commit/author that introduced
  the bug (e.g.
  `https://github.com/holdex/my-repo/commit/1234567890 @johndoe`).
- `dispute <commit-url> @<github-handle>` — dispute a previous bug report
  after the PR it was filed on has already been merged, to correct an
  incorrect attribution.

If `$ARGUMENTS` is empty, ask the user for the commit URL and the author's
GitHub handle before proceeding.

Determine which mode applies:

- No `dispute` prefix: **report** — attribute the commit/author that
  introduced the bug this PR fixes.
- `dispute` prefix: **dispute** — strip the `dispute` prefix to get the
  commit URL and handle; use this to correct a wrong attribution after
  merge.

Validate the input:

- The commit URL must point to a GitHub commit
  (`https://github.com/<owner>/<repo>/commit/<sha>`, or a PR commit/changes
  URL).
- The handle must start with `@`.

If either is missing or malformed, tell the user and stop.

## Resolve the PR

Detect the current PR from the git worktree:

```bash
gh pr list --head "$(git branch --show-current)" --json number,url,title --limit 1
```

If no PR is found for the current branch, ask the user for the PR number or
URL.

If the PR title does not start with `fix`, confirm with the user that they
still want to post a bug report comment before continuing — this command is
only required for `fix` PRs, but can be used on any PR.

## Post the comment

Report the commit/author that introduced the bug:

```bash
gh pr comment <PR_URL> --body "@holdex bug commit <COMMIT_URL> && bug author <HANDLE>"
```

Dispute a previous bug report:

```bash
gh pr comment <PR_URL> --body "@holdex bug dispute <COMMIT_URL> && bug author <HANDLE>"
```

Confirm the comment was posted and show the PR URL.
