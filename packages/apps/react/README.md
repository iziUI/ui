# @iziui/react

iziUI React components and runtime design system for consumer applications.

## Install

```bash
npm install @iziui/react react@^19.2.4 react-dom@^19.2.4
```

## Required Setup

Import the stylesheet once and render iziUI components inside `ThemeProvider`.

```tsx
import '@iziui/react/style.css';

import { Button, createTheme, ThemeProvider } from '@iziui/react';

const theme = createTheme();

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <Button type="button">Save changes</Button>
    </ThemeProvider>
  );
}
```

## Documentation

- [AI entrypoint](./AI.md)
- [Getting started](./docs/getting-started.md)
- [Component index](./docs/components/index.md)
- [Typography](./docs/design-system/typography.md)
- [Spacing](./docs/design-system/spacing.md)
- [Colors](./docs/design-system/colors.md)
- [Layout](./docs/design-system/layout.md)
- [Static tokens](./docs/design-system/tokens.md)
- [Composition patterns](./docs/composition/common-patterns.md)
- [Consumer rules](./docs/rules.md)
- [Accessibility guide](./ACCESSIBILITY.md)

Use public package exports only. Do not import from `src`, `dist`, or `_internal`.
