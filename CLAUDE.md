# LazyKit — Project Guide for Claude

## Stack
React

## Conventions
- Match the existing code style and patterns in whatever file you are editing.
- Follow the folder structure already present in the repo.
- Keep changes scoped to what the issue asks for — do not refactor unrelated code.

## Before opening a PR, always:
1. Check your code for obvious errors.
2. Make sure existing functionality is not broken.
3. If you encounter errors you cannot fix, comment on the issue explaining why instead of pushing broken code.

## Never
- Touch `.github/workflows/`, secrets, or CI configuration.
- Add new dependencies without clearly noting them in the PR description.
- Make changes outside the scope of the issue.
- Merge your own pull requests.
