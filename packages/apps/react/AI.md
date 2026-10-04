# Using @iziui/react

`@iziui/react` provides React UI components and a runtime theme for application
interfaces built with iziUI.

## Start Here

Before rendering components:

1. Read [getting started](./docs/getting-started.md).
2. Import `@iziui/react/style.css` once in the application entry point.
3. Render components inside `ThemeProvider` with a theme from `createTheme`.
4. Find a component in the [component index](./docs/components/index.md).
5. Read the relevant component guide before writing its JSX.

## Imports

Use named imports from `@iziui/react` by default:

```tsx
import { Button, Card, Stack, Typography } from '@iziui/react';
```

Category entry points are public for focused imports: `actions`, `display`,
`feedback`, `fields`, `layout`, `navigation`, `animations`, `hooks`, `lab`,
`theme`, and `core`.

Individual public component entry points use default exports, for example:

```tsx
import Button from '@iziui/react/Button';
```

Use the component index to verify an individual entry point exists before
using it.

## Documentation Map

- [Getting started](./docs/getting-started.md): setup, imports, theme, and Sass tokens.
- [Components](./docs/components/index.md): public component catalogue and imports.
- [Typography](./docs/design-system/typography.md): text hierarchy and semantic HTML.
- [Spacing](./docs/design-system/spacing.md): gap scale and layout spacing.
- [Colors](./docs/design-system/colors.md): semantic theme colors and customization.
- [Layout](./docs/design-system/layout.md): Container, Stack, Grid, GridItem, and Box.
- [Static tokens](./docs/design-system/tokens.md): bundled Sass token names and values.
- [Composition patterns](./docs/composition/common-patterns.md): pages, forms, cards, filters, feedback, and dialogs.
- [Consumer rules](./docs/rules.md): required and prohibited practices.
- [Accessibility navigation](./docs/accessibility.md): when to read full accessibility guidance.
- [Accessibility guide](./ACCESSIBILITY.md): component behavior and application responsibilities.

For exact prop types, inspect exported TypeScript declarations through your
editor after reading the matching component guide.

## Non-Negotiable Rules

- Use public package exports only. Never import from `src`, `dist`, or `_internal`.
- Do not invent props, variants, colors, or component entry points.
- Prefer existing iziUI components and layout primitives over custom HTML/CSS or another UI library.
- Use `Typography` for text hierarchy and semantic headings.
- Use `Stack` or `Grid` gaps for sibling spacing before adding margins.
- Use semantic theme colors before adding raw color values.
- Treat `@iziui/react/lab` as experimental. Do not use it without explicit approval.
