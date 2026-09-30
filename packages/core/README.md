# @iziui/core

`@iziui/core` provides theme creation, theme application, `sx` option resolution, and shared utilities for iziUI packages.

Use public package entry points. Do not import files from `src` or repository paths directly.

## Imports

Import theme APIs and utilities from the package root:

```ts
import { applyTheme, createTheme, getContrastColor, joinClass } from '@iziui/core';
```

Category entry points are public when a smaller import boundary is required:

- `@iziui/core/theme`
- `@iziui/core/utils`
- `@iziui/core/plugin`
- `@iziui/core/system`
- `@iziui/core/options`

`createOptions` is the default export of the options entry point:

```ts
import createOptions, { type CustomOptions } from '@iziui/core/options';
```

## Theme

`createTheme` creates a complete runtime theme. It starts with light mode by default, uses dark defaults when `mode` is `dark`, and derives `main`, `light`, `dark`, `opacity`, and `contrast` values for every semantic color family.

```ts
import { applyTheme, createTheme } from '@iziui/core';

const theme = createTheme({
  mode: 'dark',
  palette: {
    primary: '#6C37F4',
  },
  shape: { radius: 12 },
  spacing: 8,
});

applyTheme(theme);
```

`applyTheme` writes theme values as CSS custom properties on the document root. It does nothing during server-side rendering. When `typography.url` is set, it adds the stylesheet to the document head once.

| Theme value | CSS custom properties |
| --- | --- |
| Color families | `--primary`, `--primary-light`, `--primary-dark`, `--primary-contrast`, `--primary-opacity`; same pattern for `secondary`, `success`, `warning`, `error`, `info`, and `grey` |
| Text | `--text-primary`, `--text-secondary`, `--text-disabled` |
| Background | `--background-default`, `--background-paper`, `--background-muted` |
| Other | `--divider`, `--radius`, `--spacing`, `--typography` |

`ThemeOptions.palette` is shallow. When overriding `text` or `background`, provide every field in that nested object.

## `sx` Options

`CustomOptions` defines theme-aware styling values. `createOptions` runs supplied plugins and returns CSS properties for a component wrapper.

```ts
import { createTheme } from '@iziui/core';
import {
  defineBackground,
  defineBorderColor,
  defineBorderRadius,
  defineBoxShadow,
  definePadding,
} from '@iziui/core/plugin';
import createOptions, { type CustomOptions } from '@iziui/core/options';

const theme = createTheme();
const sx: CustomOptions = {
  background: ({ primary }) => primary.main,
  borderColor: ({ primary }) => primary.dark,
  borderRadius: 1,
  boxShadow: 'sm',
  p: 2,
};

const style = createOptions(
  { theme, sx },
  defineBackground,
  defineBorderColor,
  defineBorderRadius,
  defineBoxShadow,
  definePadding,
);
```

Supported options:

- Colors: `background`, `backgroundColor`, `borderColor`, `color`.
- Shape: `borderRadius`.
- Spacing: `p`, `px`, `py`, `pt`, `pr`, `pb`, `pl`, `m`, `mx`, `my`, `mt`, `mr`, `mb`, `ml`.
- Elevation: `boxShadow` with `sm`, `md`, or `lg`.

Color options receive the active palette in their callback. Spacing values multiply `theme.spacing`; a nonzero `borderRadius` multiplies `theme.shape.radius`.

## Utilities

The root utility API includes color transforms and class-name composition:

```ts
import {
  generateSupportColors,
  getContrastColor,
  joinClass,
} from '@iziui/core';

const palette = generateSupportColors('#6C37F4');
const contrast = getContrastColor(palette.main);
const className = joinClass('iziui-card', contrast === '#ffffff' && 'iziui-card--dark');
```

Other public utilities include `adjustLightness`, `convertPathToColor`, `getLinearGradient`, `getOpacityColor`, `getPriorityColor`, `hexToHsl`, and `hslToHex`.

## Package Boundaries

| Package | Responsibility |
| --- | --- |
| `@iziui/tokens` | Static design values compiled to JavaScript and Sass |
| `@iziui/core` | Runtime themes, `sx` option plugins, and shared utilities |
| `@iziui/react` | React components, `ThemeProvider`, and component styling |

Read the [@iziui/tokens guide](../tokens/README.md) for static values and Sass mixins. Read the [@iziui/react guide](../apps/react/README.md) for React setup, `ThemeProvider`, and component APIs.

## Test and Ownership

Core source lives in `src/theme/`, `src/plugin/`, `src/options/`, `src/system/`, and `src/utils/`.

Run the Core test suite with:

```sh
make run core test
```
