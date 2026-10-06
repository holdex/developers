# Sourced by every git hook before lefthook runs (see `rc` in lefthook.yml).

# GUI git clients such as GitHub Desktop start without the shell's PATH, so
# node from nvm or Homebrew is missing. Add the usual locations.
if ! command -v node >/dev/null 2>&1; then
  for dir in /opt/homebrew/bin /usr/local/bin; do
    [ -x "$dir/node" ] && PATH="$dir:$PATH"
  done
fi
if ! command -v node >/dev/null 2>&1 && [ -d "$HOME/.nvm/versions/node" ]; then
  PATH="$(ls -d "$HOME/.nvm/versions/node"/*/bin | tail -1):$PATH"
fi
export PATH

# Point the hook at this checkout's lefthook. Without this, lefthook's own
# lookup breaks on paths with spaces and falls through to unrelated tools
# (such as Mintlify's `mint`). When the checks cannot run here, say so and let
# the commit through: CI runs the same checks on the PR.
if ! command -v node >/dev/null 2>&1 || [ ! -x node_modules/.bin/lefthook ]; then
  echo "git hooks skipped: run \`npm install\` in this checkout (CI still checks)." >&2
  exit 0
fi
LEFTHOOK_BIN=node_modules/.bin/lefthook
export LEFTHOOK_BIN
