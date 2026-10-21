---
"@a12e/accessmonitor-ds": minor
---

`SortingTable` accepts three new props for accessible names that were hardcoded in Portuguese: `itemsPerPageNavLabel` (the `<nav>` around the items-per-page selector), `pagesNavLabel` (the `<nav>` with the page buttons) and `selectAllLabel` (the "select all" checkbox in a `Checkbox` header). Defaults are unchanged (`"itens por página"`, `"páginas"`, `"selecionar registos"`), so existing usages render the same markup. Apps in other languages should pass translated values so screen readers announce these landmarks in the page language (WCAG 3.1.2, 2.4.6).
