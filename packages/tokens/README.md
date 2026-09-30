# @iziui/tokens

`@iziui/tokens` defines shared design values for iziUI. The package builds its source tokens into JavaScript exports and Sass variables and mixins.

Use public `web` entry points. Do not import files from `src` or `dist` directly.

## Consume Tokens

### Sass

Import the Sass entry point in component styles:

```scss
@use '@iziui/tokens/web/scss/main.scss' as *;

.card {
  padding: $spacing;
  border-radius: $radius;
  box-shadow: $box-shadow-regular;
}

@include for-md {
  .card {
    padding: calc($spacing * 2);
  }
}
```

Generated Sass variables use kebab case. For example, JavaScript export `boxShadowRegular` is Sass variable `$box-shadow-regular`.

### JavaScript and TypeScript

Import values from the JavaScript entry point:

```ts
import { md, radius, spacing } from '@iziui/tokens/web/js';

const compactViewport = window.matchMedia(`(max-width: ${md}px)`);

console.log(spacing);
console.log(radius);
```

Breakpoint exports are unitless strings. Add `px` when building a browser media query in JavaScript. Prefer Sass mixins for stylesheet breakpoints.

## Token Reference

Read the generated [token reference](TOKEN_REFERENCE.md) for current JavaScript exports, Sass variables, and values. The build updates this file from token sources.

`colors` defines supported semantic color names. It does not define color values; color values belong to theme configuration. Sass also exposes `for-xl`, `for-lg`, `for-md`, `for-sm`, and `for-xs` breakpoint mixins.

## Build and Ownership

Token source files live in `src/_base/`. Static collections and constants live in `src/consts/`. Build generated outputs with:

```sh
yarn workspace @iziui/tokens build
```

The build writes `dist/web/js/`, `dist/web/scss/`, and `TOKEN_REFERENCE.md`. Do not edit generated files. Change token sources, rebuild the package, then commit source and generated output together.
