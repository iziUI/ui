# Package Dependency Boundaries

## Scope

This document records cross-package imports observed in source on 2026-10-01. It defines the allowed dependency direction until an explicit architecture change updates it.

## Allowed Dependencies

| Package | May depend on |
| --- | --- |
| `@iziui/toolkit` | External dependencies only |
| `@iziui/tokens` | `@iziui/toolkit` |
| `@iziui/core` | `@iziui/tokens`, `@iziui/toolkit` |
| `@iziui/styles` | No iziUI package |
| `@iziui/react` | `@iziui/tokens`, `@iziui/toolkit`, `@iziui/core`, `@iziui/styles` |

`@iziui/react` is the only package that imports `@iziui/styles`. `@iziui/styles` does not directly import an iziUI package.

## Import Rules

- Add a cross-package import only when it follows the table above.
- Do not create a dependency from a lower-level package to a higher-level package.
- Use exported package entry points. Do not import `src`, `dist`, `_internal`, or repository paths from another package.
- An architecture change that adds a dependency direction must update this document, package manifests where applicable, and affected public API documentation.

## Evidence

Source imports show `@iziui/tokens` using `@iziui/toolkit`; `@iziui/core` using `@iziui/tokens` and `@iziui/toolkit`; and `@iziui/react` using all four foundation packages. No source imports from `@iziui/styles` to another iziUI package were found.
