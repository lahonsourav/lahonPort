# LazyKit — Project Guide for Claude

## Stack
React

## Conventions
- Match the existing code style and patterns in whatever file you are editing.
- Follow the folder structure already present in the repo.
- Keep changes scoped to what the issue asks for — do not refactor unrelated code.
- Responsive breakpoints: for any *new* `@media` query, use one of `480px` (small
  phones), `768px` (tablets), or `1024px` (small laptops) as the `max-width`/
  `min-width` value. Existing components use a wider scattered set (600/640/700/
  760/900px, etc.) — leave those as-is unless you're already touching that file
  for another reason; this convention is only meant to stop further drift.

## Before opening a PR, always:
1. Check your code for obvious errors.
2. Make sure existing functionality is not broken.
3. If you encounter errors you cannot fix, comment on the issue explaining why instead of pushing broken code.

## Never
- Touch `.github/workflows/`, secrets, or CI configuration.
- Add new dependencies without clearly noting them in the PR description.
- Make changes outside the scope of the issue.
- Merge your own pull requests.
