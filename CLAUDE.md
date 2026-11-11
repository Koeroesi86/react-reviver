# react-reviver

Small TypeScript library (`@koeroesi86/react-reviver`): revives React trees from JSON-like layouts via a component registry. ~7 source files; read them directly rather than exploring.

## Layout
- `src/index.tsx` — public exports (`ReviverProvider`, `ReviverLayout`, types). Anything not exported here is private.
- `src/reviver-registry/` — context + provider; unknown alias warns and renders `() => null`.
- `src/layout/`, `src/node-reviver/` — recursive, memoized (by node reference) rendering of `{ type, id?, props?, children? }`; leaves get no `children`.
- `src/types.ts` — public types. No runtime PropTypes (ignored on React 19).
- `src/example.tsx` + `src/example.spec.tsx` (+ snapshot) — doubles as the README example and the only test.
- `scripts/version.js` — CI-only; sets version `YY.MM.<run id>-<ref>`; requires `GITHUB_*` env.
- `docs/` — GitHub Pages (Jekyll); mirrors README usage. Keep both in sync when the example changes.

## Node on PATH
In some sessions (e.g. the VS Code Flatpak) `node`/`npm` are not on `PATH`. Load Node 24 via nvm in the same command before any npm script:
`export NVM_DIR="$HOME/.nvm"; [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"; nvm use 24 >/dev/null`

## Commands
`npm ci` · `npm run lint` · `npm test` · `npm run build` (dts + webpack → `dist/`). Use npm, not yarn.
`npm run fallow` runs Fallow dead-code analysis (config in `.fallowrc.json`; also a Stop hook in `.claude/settings.json` and the `Branch build` CI workflow).
`npm run test:compat` smoke-tests the built bundle against the installed React (build first); supported range `react >=16.8.0`, CI covers 16.8/17/18/19.
Before finishing a code change: lint + test. Update the snapshot only when output intentionally changed.

## Conventions
- Follow global style rules (no nested conditions, kebab-case files, avoid `any`/casts; existing `any` in `types.ts` is intentional).
- Supports React >=16.8 (peer dependency); in docs/examples use React 19's `createRoot` from `react-dom/client`, never `ReactDOM.render`.
- Public API changes: update `src/index.tsx`, README, and `docs/index.md` together.
- Never publish manually or edit `version` in package.json; CI (`publish.yml` on `main`) publishes. PRs run `build.yml` (`npm publish --dry-run`).
- Don't edit `package-lock.json` by hand; dependabot (weekly, grouped) handles upgrades.

## Keeping token usage low
- Don't read `package-lock.json`, `dist/`, `.cache/`, `node_modules/` or the `.snap` file unless the task requires it.
- Skip Explore/subagents — all of `src/` fits in one `cat`.
- Run `npm test` and `npm run lint` with `2>&1 | tail -30`; rerun in full only on failure.
- Don't run `npm run build` for small changes; lint + test suffice unless build config or exports changed.
- Docs-only edits (README, docs/, CLAUDE.md) need no test run.
- Prefer `git diff --stat` / `git log --oneline -n 10` over full diffs and logs.
- Use `/release-check` before PRs touching CI, packaging or exports.
