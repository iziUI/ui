# Getting Started

## Install

Install iziUI with React 19.2.4 or a compatible React 19 version:

```bash
npm install @iziui/react react@^19.2.4 react-dom@^19.2.4
```

## Required Setup

Import iziUI CSS once at the application entry point. Create one theme and
place `ThemeProvider` above every iziUI component.

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

Without the stylesheet, components have no iziUI visual rules. Without
`ThemeProvider`, theme-aware components cannot read palette and typography
values.

## Theme

`createTheme()` creates light mode. Pass `mode: 'dark'` to use the provided
dark palette. Theme overrides use numbers for `spacing` and `shape.radius`.

```tsx
import { createTheme, ThemeProvider } from '@iziui/react';

const theme = createTheme({
  mode: 'dark',
  shape: { radius: 12 },
  spacing: 8,
  palette: { primary: '#6C37F4' },
});

export function DarkApp({ children }: React.PropsWithChildren) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
```

Use `useTheme()` only inside `ThemeProvider` when a component must read the
current theme or replace it. Read [colors](./design-system/colors.md) before
customizing palette values.

## Component Imports

Prefer named root imports when application code uses several components:

```tsx
import { Button, Card, CardContent, Stack, Typography } from '@iziui/react';
```

Public category imports are available when a focused boundary helps:

```tsx
import { Button } from '@iziui/react/actions';
import { Stack } from '@iziui/react/layout';
```

An individual component entry point is a default import only when listed in
the [component index](./components/index.md):

```tsx
import Button from '@iziui/react/Button';
```

Never import from package implementation paths such as `@iziui/react/src`,
`@iziui/react/dist`, or `_internal`.

## Static Sass Tokens

The React package includes compiled Sass variables and mixins:

```scss
@use '@iziui/react/scss/main.scss' as *;

.custom-panel {
  border-radius: $radius;
  padding: $spacing;
}
```

These static Sass tokens do not change when the runtime theme changes. The
React package does not expose JavaScript token imports. Install `@iziui/tokens`
separately and import from `@iziui/tokens/web/js` when application JavaScript
needs static token values.

Read [Static tokens](./design-system/tokens.md) for bundled Sass token names
and values.

Next: read [consumer rules](./rules.md), then select a component from the
[component index](./components/index.md).
