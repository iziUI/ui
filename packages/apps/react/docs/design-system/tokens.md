# Static Tokens

Static tokens are bundled as Sass variables and mixins. Import them from the
public React package entry point:

```scss
@use '@iziui/react/scss/main.scss' as *;
```

Use runtime theme values for component colors and typography. Static Sass
tokens do not change when `ThemeProvider` changes the application theme.

## Shape And Grid

| Sass token | Value | Use |
| --- | --- | --- |
| `$radius` | `8px` | Base corner radius |
| `$spacing` | `8px` | Base custom Sass spacing |
| `$gap` | `0` | Grid base gap |
| `$columns` | `12` | Grid column count |
| `$rows` | `1` | Grid base row count |

## Breakpoints

Use Sass breakpoint mixins for custom stylesheet rules. Component `Grid`
uses matching responsive ranges.

| Token | Value | Sass mixin |
| --- | --- | --- |
| `$xs` | `599` | `for-xs` |
| `$sm` | `899` | `for-sm` |
| `$md` | `1199` | `for-md` |
| `$lg` | `1535` | `for-lg` |
| `$xl` | `1536` | `for-xl` |

```scss
.game-grid {
  padding: $spacing;

  @include for-md {
    padding: calc($spacing * 3);
  }
}
```

## Visual Tokens

| Sass token | Use |
| --- | --- |
| `$box-shadow-small` | Low elevation |
| `$box-shadow-regular` | Default elevation |
| `$box-shadow-large` | High elevation |
| `$animation` | Standard transition timing |
| `$proportion-base`, `$proportion-small` | Existing visual proportions |

Static collections include semantic color names `primary`, `secondary`,
`info`, `error`, `warning`, `success`, and `grey`; sizes `xs`, `sm`, `md`,
`lg`, and `xl`; font sizes `small: 12px`, `medium: 16px`, `large: 22px`; and
icon sizes `small: 16px`, `medium: 24px`, `large: 32px`.

Use component props, `Typography`, `Stack`, `Grid`, and theme-aware `sx`
before writing custom Sass. Do not hardcode a value when a component API
expresses the same decision.
