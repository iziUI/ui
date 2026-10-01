# @iziui/react

React component library for iziUI.

## Installation

Install the library with matching React packages:

```bash
npm install @iziui/react react@^19.2.4 react-dom@^19.2.4
```

Install React and React DOM 19.2.4 or later within React 19. This matches the library runtime dependencies and avoids an additional React copy.

## Required Setup

Import the bundled stylesheet once in the application entry point. Create a theme and pass it to `ThemeProvider` before rendering iziUI components.

```tsx
import '@iziui/react/style.css';

import { Button, createTheme, ThemeProvider } from '@iziui/react';

const theme = createTheme();

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <Button onClick={() => {}}>Save changes</Button>
    </ThemeProvider>
  );
}
```

The stylesheet provides component rules. `ThemeProvider` applies the current theme as CSS custom properties, including palette colors, text colors, backgrounds, divider color, radius, spacing, and typography family.

## Imports

Prefer named imports from the package root for application code:

```tsx
import {
  Button,
  Card,
  CardContent,
  Grid,
  GridItem,
  Stack,
  Typography,
} from '@iziui/react';
```

Category entry points are also public:

- `@iziui/react/actions`
- `@iziui/react/display`
- `@iziui/react/feedback`
- `@iziui/react/fields`
- `@iziui/react/layout`
- `@iziui/react/navigation`
- `@iziui/react/animations`
- `@iziui/react/hooks`
- `@iziui/react/lab`
- `@iziui/react/theme`
- `@iziui/react/core`

Do not import from package `dist`, `_internal`, or repository source paths. Their structure is not a consumer API.

### Specialized Entry Points

Individual component, animation, hook, and SCSS entry points are public when a smaller import boundary is required:

```tsx
import Card from '@iziui/react/Card';
import CardContent from '@iziui/react/CardContent';
import Button from '@iziui/react/Button';
import Fade from '@iziui/react/animations/Fade';
import useResize from '@iziui/react/hooks/useResize';
```

Individual component, animation, and hook entry points export defaults. Use root or category imports when several related APIs are needed.

Sass consumers can load generated variables and mixins with:

```scss
@use '@iziui/react/scss/main.scss' as *;
```

## Theme

`createTheme` builds a light theme by default. Set `mode` to use the provided dark palette or override supported values.

```tsx
import type { PropsWithChildren } from 'react';

import { createTheme, ThemeProvider } from '@iziui/react';

const darkTheme = createTheme({
  mode: 'dark',
  shape: { radius: 12 },
  spacing: 8,
  palette: {
    primary: '#6C37F4',
  },
});

export function DarkApp({ children }: PropsWithChildren) {
  return <ThemeProvider theme={darkTheme}>{children}</ThemeProvider>;
}
```

`shape.radius` and `spacing` are numbers. The provider converts them to pixel CSS custom properties. `spacing` currently affects runtime consumers such as `Tooltip`; `Stack.gap` and `Grid.gap` receive their own numeric CSS pixel values.

The theme has `primary`, `secondary`, `success`, `warning`, `error`, `info`, and `grey` color families. Each family includes derived `main`, `light`, `dark`, `opacity`, and `contrast` values. Text, background, and divider values are also available through the theme.

### Tokens and Runtime Theme

Design tokens and themes solve different problems:

| Concern | `@iziui/tokens` | React theme |
| --- | --- | --- |
| Scope | Static shared values | Runtime application values |
| Access | Sass and JavaScript exports | `ThemeProvider` and `useTheme` |
| Examples | `spacing`, `radius`, `md` | `palette.primary`, `shape.radius`, `typography.family` |
| Updates | Rebuild package after a source change | Call `updateTheme` with a new theme |

Tokens do not change when the runtime theme changes. For example, token `spacing` remains `8px`; `theme.spacing` can use another value for an application.

Use `useTheme` inside a provider subtree to read the current theme or replace it:

```tsx
import { createTheme, useTheme } from '@iziui/react';

export function ThemeMode() {
  const { theme, updateTheme } = useTheme();

  const enableDarkMode = () => {
    updateTheme(createTheme({ mode: 'dark' }));
  };

  return (
    <button type="button" onClick={enableDarkMode}>
      Current mode: {theme.mode}
    </button>
  );
}
```

`ThemeProvider` applies these CSS custom properties on the document root:

| Theme value | CSS custom properties |
| --- | --- |
| Color families | `--primary`, `--primary-light`, `--primary-dark`, `--primary-contrast`, `--primary-opacity`; same pattern for `secondary`, `success`, `warning`, `error`, `info`, and `grey` |
| Text | `--text-primary`, `--text-secondary`, `--text-disabled` |
| Background | `--background-default`, `--background-paper`, `--background-muted` |
| Other | `--divider`, `--radius`, `--spacing`, `--typography` |

Use the [@iziui/tokens guide](../../tokens/README.md) for static token values and Sass mixins.

## Responsive Card Grid

Use `Stack` for vertical structure and `Grid` with `GridItem` for responsive columns. Breakpoint props represent spans from 1 to 12.

```tsx
import {
  Card,
  CardContent,
  Grid,
  GridItem,
  Stack,
  Typography,
} from '@iziui/react';

const summaries = ['Balance', 'Bets', 'Bonus'];

export function AccountSummary() {
  return (
    <Stack tag="section" gap={24} aria-labelledby="account-summary-title">
      <Stack tag="header" gap={8}>
        <Typography id="account-summary-title" variant="h2">
          Account summary
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Updated today.
        </Typography>
      </Stack>

      <Grid xs={12} sm={6} md={4} lg={4} xl={4} gap={16}>
        {summaries.map((summary) => (
          <GridItem key={summary}>
            <Card>
              <CardContent>
                <Typography variant="h3">{summary}</Typography>
              </CardContent>
            </Card>
          </GridItem>
        ))}
      </Grid>
    </Stack>
  );
}
```

Breakpoints are `xs` through 599px, `sm` from 600px through 899px, `md` from 900px through 1199px, `lg` from 1200px through 1535px, and `xl` from 1536px.

`Grid` applies its breakpoint props to each `GridItem`. Missing spans fall back from wider to narrower breakpoints: `xl`, then `lg`, `md`, `sm`, and `xs`. Set every span explicitly when responsive behavior must not depend on this fallback.

`Stack.gap` and `Grid.gap` accept pixel values. Use a consistent spacing convention in an application; the default theme spacing value is 8, but these props do not automatically multiply it.

## Accessibility Notes

Read the [accessibility guide](./ACCESSIBILITY.md) for component guarantees and application responsibilities.

- Use `Typography` heading variants in document order. `h1` through `h6` render their matching HTML heading elements.
- A Card with `onClick` is exposed as a button and supports mouse click, Enter, and Space. Use it only when the whole card represents one action; do not nest other interactive controls inside it.
- Use native `disabled` on Button when an action is unavailable.
- `Button.loading` requires a React element. For a busy action, also pass `disabled`, `aria-busy`, an accessible `aria-label`, and `<Loading aria-hidden="true" />`. Do not pass `true`; boolean loading is not currently supported safely.

## Experimental APIs

Form utilities are exported from `@iziui/react/lab` and `@iziui/react/lab/Form`. Treat them as experimental until their public API and accessibility guidance are documented.

## Design Tokens

The React package exposes theme APIs and compiled SCSS assets. Read the [@iziui/tokens guide](../../tokens/README.md) for public token exports. Do not depend on internal token build paths from application code.
