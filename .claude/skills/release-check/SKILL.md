---
name: release-check
description: Cheap pre-PR check for react-reviver — lint, test, build, and packaged-file sanity. Use before opening a PR that touches exports, build config, workflows or package.json.
---

Run, trimming output to save tokens:

1. `npm run lint 2>&1 | tail -30`
2. `npm test 2>&1 | tail -30`
3. `npm run build 2>&1 | tail -20`, then `npm pack --dry-run 2>&1 | tail -25`

Do NOT run `npm run generate-version` locally; it is CI-only and rewrites package.json.

Verify in the pack listing: `dist/` is included; `dist/example`, `src` and config files are not.
Check that every symbol exported from `src/index.tsx` appears in `dist/index.d.ts`, and that the README and `docs/index.md` examples still match `src/example.tsx`.
Report only failures and mismatches; one line if everything is clean.
