# @a12e/accessmonitor-ds

## 1.3.1

### Patch Changes

- e68051c: Footer: the ARTE logos (colour and white) are now embedded in the bundle, so the footer shows the logo as soon as the package is installed, without copying files into the app's `public/img`. The `logoSrc` and `logoDarkSrc` props still override the images.

## 1.3.0

### Minor Changes

- e68051c: Footer: add optional `logoSrc` and `logoDarkSrc` props so consuming apps can provide the ARTE logo source when `/img/...` is not served from their public folder. Defaults are unchanged.
- 11cd9b7: `SortingTable` accepts three new props for accessible names that were hardcoded in Portuguese: `itemsPerPageNavLabel` (the `<nav>` around the items-per-page selector), `pagesNavLabel` (the `<nav>` with the page buttons) and `selectAllLabel` (the "select all" checkbox in a `Checkbox` header). Defaults are unchanged (`"itens por página"`, `"páginas"`, `"selecionar registos"`), so existing usages render the same markup. Apps in other languages should pass translated values so screen readers announce these landmarks in the page language (WCAG 3.1.2, 2.4.6).

## 1.2.0

### Minor Changes

- 7f8d7bb: SortingTable: add onSortChange to delegate sorting (server-side) and maxItemsPerPage to cap the items-per-page options

## 1.1.0

### Minor Changes

- d3721c2: remove tfoot

## 1.0.7

### Patch Changes

- e4790ef: remove button to hide menu and improve accessibility

## 1.0.6

### Patch Changes

- d287847: Update table and restructuring the menu

## 1.0.5

### Patch Changes

- de73c47: add last item of pagination as the length of data

## 1.0.4

### Patch Changes

- 450bddb: add config repository in package json

## 1.0.3

### Patch Changes

- aaad2f3: change token to github token
- e76b2e8: update version of package

## 1.0.2

### Patch Changes

- 88fd299: update package json config to solve dependecy conflicts

## 1.0.1

### Patch Changes

- 4569aaf: Set up change set
- 2a0121a: update workflow version
- 91f250a: Remove unecessary commentary and add script to release
