# Contributing to Fluent Blocks

Please see the contribution docs specific to each package:

- [React](packages/react/CONTRIBUTING.md)
- [Schemas](packages/schemas/README.md)

## Releasing Fluent Blocks

This project uses Changeset in CI to handle releases.

In order to clarify the git history:
- When contributing to `next`, use _squash commits_.
- When releasing `latest`, use _merge commits_.

### Releasing to `next`

The Changeset bot will create a PR (or update its existing PR) when changes are
merged into the `next` branch. Do a _squash commit_ of its PR into the `next` branch to release to the `next` tag.

### Releasing to `latest`

To release all changes in `next` to `latest`:
1. Create a branch `release/latest` based on `next`
2. Merge `origin`’s `latest` into `release/latest`
    - Check the git logs for where `next` was branched from `latest` to ensure `next` isn’t missing any important changes. If there are none, you can resolve conflicts automatically with `git merge -s recursive -X ours origin/latest`.
    - Otherwise, resolve merge conflicts manually.
3. Run `pnpm changeset pre exit` and commit & push its change to `.changeset`.
4. Create a PR to merge `release/latest` into `latest`
5. When tests pass and visual regressions are resolved, _do a merge commit_ to close the PR instead of a squash.
6. The Changeset bot will create a PR into `latest` that finalizes the release’s version numbers and updates changelogs; to release to NPM, close the PR _with another merge commit_.
7. Immediately create a branch based on `next` called `merge/latest`.
8. Merge the final released changes to `latest` into `merge/latest`.
9. Run `pnpm changeset pre enter next` and commit & push its change to `.changeset`.
10. Create a PR to merge `merge/latest` into `next` and use a _squash commit_, as usual, to close the PR.
11. You don’t have to release the result of this change, the `next` branch should just always have `.changeset/pre.json`.
