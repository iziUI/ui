# Consumer AI Documentation Design

**Date:** 2026-10-03

## Goal

Make the published `@iziui/react` package self-describing for agents and developers
building consuming React applications. An installed package must contain the component
catalogue, correct public imports, design-system guidance, composition patterns,
accessibility responsibilities, and explicit consumer rules.

This work serves package consumers. It does not replace contributor documentation in
the repository root, `AGENTS.md`, architecture documents, or build documentation.

## Current State

`@iziui/react` publishes `dist` through the package `files` allowlist. `README.md` is
included automatically by npm, but `ACCESSIBILITY.md`, token documentation, Storybook,
and workspace documentation are not included. Several README links currently point to
workspace-relative paths that do not exist after installation.

The package has public root, category, component, animation, hook, theme, core, and
lab entry points. Public TypeScript declarations are bundled in `dist`, and component
prop types are generally exported. Storybook exists only in the source repository and
has documented API discrepancies, so it cannot be treated as installed consumer
documentation.

## Scope

The change will:

- Add published, consumer-facing Markdown documentation to `packages/apps/react`.
- Add `AI.md` as a short navigation entry point for agents.
- Replace workspace-relative README links with package-relative links.
- Document stable public APIs from source behavior and emitted type declarations.
- Document the design system, composition patterns, accessibility responsibilities,
  import rules, and prohibited usage.
- Add JSDoc to high-decision public props.
- Correct `Button.loading={true}`, because its public type accepts a boolean while the
  current implementation assumes a React element.
- Ensure package publication includes every consumer document.

The change will not:

- Remove contributor documentation or alter package dependency boundaries.
- Make experimental `lab` APIs stable.
- Add an MCP server, an installable skill, or a manual `ai-manifest.json`.
- Broadly refactor component behavior that is outside consumer discoverability.

## Published Documentation Structure

```text
packages/apps/react/
├── AI.md
├── README.md
├── ACCESSIBILITY.md
├── docs/
│   ├── getting-started.md
│   ├── rules.md
│   ├── accessibility.md
│   ├── components/
│   │   ├── index.md
│   │   ├── actions.md
│   │   ├── display.md
│   │   ├── fields.md
│   │   ├── feedback.md
│   │   ├── layout.md
│   │   ├── navigation.md
│   │   └── advanced.md
│   ├── design-system/
│   │   ├── typography.md
│   │   ├── spacing.md
│   │   ├── colors.md
│   │   └── layout.md
│   └── composition/
│       └── common-patterns.md
└── dist/
```

`AI.md` is an index, not an API reference. It identifies the package, required setup,
the public import policy, documentation layers, and consumer rules. It directs an
agent to the smallest next document for a task.

`README.md` remains the human entry point. It contains installation, required CSS and
provider setup, a short import example, and links to the detailed package-local guides.

## Component Documentation

`docs/components/index.md` lists public stable components by category. Every entry
states its root import, category import, individual import when one exists, exported
props type, and the document section that explains its use.

Each category document contains a section for every public API in its domain. Each
section includes:

- Purpose and selection guidance.
- Supported public import paths.
- Decision-making props, defaults, unions, and values that differ from native HTML.
- Related components and required composition.
- A minimal example using public APIs only.
- Constraints, accessibility responsibilities, and unsupported combinations.

The advanced document lists animations, hooks, and `lab` APIs separately. It marks
`lab` as experimental and avoids presenting it as a default form solution.

The documentation describes source behavior, not inaccurate Storybook metadata. APIs
with consumer-relevant limitations are documented with explicit restrictions. For
example, agents must not use clickable cards with nested controls, must provide
accessible names for icon-only controls and dialogs, and must not treat limited field
components as accessible when their implementation cannot support required semantics.

## Design System And Composition

The design-system guides answer selection questions before listing values:

- Typography documents real `Typography` variants, generated HTML, heading order,
  subtitle limits, text colors, and hierarchy examples.
- Spacing documents the static `8px` token, runtime theme spacing, and the fact that
  `Stack.gap` and `Grid.gap` accept direct pixel values. It prefers `gap` for sibling
  layout over child margins.
- Colors documents semantic color families, their derived values, text/background/
  divider paths, and theme customization boundaries.
- Layout documents `Container`, `Stack`, `Grid`, `GridItem`, and `Box`, including
  breakpoint spans and responsive fallback behavior.

The composition guide provides working public-API examples for a page header, form,
card, list, responsive grid, filters, toolbar, empty state, error state, modal, and
responsive page. Examples use `Stack`, `Grid`, `Typography`, and other existing
components only.

`docs/rules.md` prohibits deep imports, invented props or variants, raw colors when a
semantic theme value applies, margin-driven sibling layout when `Stack` or `Grid` is
appropriate, adding another UI library for an existing iziUI need, and undocumented
experimental API use.

`docs/accessibility.md` presents consumer actions from `ACCESSIBILITY.md` in the
progressive documentation tree. `ACCESSIBILITY.md` remains a published direct guide.

## TypeScript And Behavioral Correction

Existing public prop interfaces and unions remain public. Add JSDoc only where the
name and type do not fully state the required consumer behavior:

- `Stack.gap`: direct-child spacing and preference over child margins.
- `Grid` span properties: supported 1–12 column spans and responsive inheritance.
- `Typography.variant`: semantic element and hierarchy behavior.
- `Button.loading`: supported input and required busy-state responsibilities.

`Button.loading` currently accepts `boolean` in its public type but calls
`cloneElement` when the value is `true`. The implementation will render its standard
`Loading` indicator for `true`, preserve custom `Loading` element support, suppress
click handling while loading, and keep consumer responsibility for `disabled`,
`aria-busy`, and an accessible name explicit in documentation.

## Publication

Update `packages/apps/react/package.json` so `files` includes `dist`, `docs`, `AI.md`,
`README.md`, and `ACCESSIBILITY.md`. No `.npmignore` exists, so the allowlist remains
the package publication boundary. Existing `exports` remain unchanged because
documentation is read from package files and is not a JavaScript import API.

No `ai-manifest.json` is included. A hand-maintained manifest duplicates component
imports and document links, then risks drifting after public export changes. The
existing build can discover entries but cannot generate selection guidance,
accessibility limits, or composition rules. A future manifest should be generated from
public exports and a structured documentation index, never manually maintained.

## Validation

Validation will prove both content and distribution:

1. Run React type checking and build through the repository Makefile.
2. Run focused existing tests for `Button` after the loading behavior correction.
3. Run `yarn pack --dry-run` in `packages/apps/react` and verify every required
   document is included.
4. Inspect built declaration output for JSDoc and public prop types.
5. Check documentation links resolve within `packages/apps/react` and examples use
   only exported APIs.
6. Walk the videogame catalogue scenario from `AI.md` through component, layout,
   typography, spacing, color, card, filter, action, and consumer-rule guidance.

## Remaining Future Work

Potential follow-up work includes a generated manifest, documentation coverage checks,
an installable consumer skill, an MCP integration, and automated API documentation
generation. None is required for the initial self-describing npm package.
