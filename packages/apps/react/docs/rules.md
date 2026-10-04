# Consumer Rules

Follow these rules in every consuming application.

## Use Public APIs

- Import only from documented `@iziui/react` entry points.
- Do not import package `src`, `dist`, `_internal`, repository paths, or Storybook files.
- Do not invent components, props, variants, color names, or individual entry points.
- Inspect the component guide and exported TypeScript type before using an unfamiliar API.

## Compose Before Styling

- Search the component index before creating custom HTML or CSS.
- Prefer `Container`, `Stack`, `Grid`, and `GridItem` for page and section layout.
- Use `Stack.gap` and `Grid.gap` for sibling spacing. Do not add margins to every child.
- Use `Box` only for localized theme-aware styling that no higher-level primitive owns.
- Do not add another UI library to solve a need already covered by iziUI.

## Preserve Design System

- Use `Typography` for visible text hierarchy.
- Keep one `h1` per page view and preserve heading order.
- Use semantic component and theme colors before raw color values.
- Use `text.*`, `background.*`, and `divider` paths for themed text, surfaces, and borders.
- Use documented spacing and breakpoints. Do not assume gap values multiply `theme.spacing`.

## Preserve Accessibility

- Give icon-only controls, custom triggers, and unnamed dialogs accessible names.
- Use visible labels for fields unless a visible label is redundant.
- Do not rely on color alone for errors, warnings, selection, or status.
- Do not place interactive controls inside a clickable `Card`.
- Read [the full accessibility guide](../ACCESSIBILITY.md) before building fields, overlays, menus, dialogs, or asynchronous feedback.

## Experimental APIs

Everything in `@iziui/react/lab` is experimental. Its API and accessibility
contract can change. Use it only with explicit project approval.
