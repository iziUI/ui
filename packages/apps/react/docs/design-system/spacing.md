# Spacing

Use layout `gap` to separate direct siblings. Use margins only for external
separation when no layout primitive owns the relationship.

## Values

The static Sass token `$spacing` is `8px`. Runtime `theme.spacing` also
defaults to `8`, but it is configurable per application.

`Stack.gap` and `Grid.gap` are direct CSS pixel values. They do not multiply
`theme.spacing`.

| Gap | Use for |
| --- | --- |
| `8` | Label and control, heading and short description |
| `12` | Compact related controls or metadata |
| `16` | Default Stack grouping, card content groups |
| `24` | Section internals and page header to content |
| `32` | Major page sections |
| `40` | Large page-level separation |

These values are application conventions, not named component token unions.
The only static base spacing token is `8px`.

## Choose gap First

```tsx
<Stack gap={24} tag="section">
  <Stack gap={8} tag="header">
    <Typography variant="h2">Featured games</Typography>
    <Typography color="text.secondary" variant="body2">
      Curated for this week.
    </Typography>
  </Stack>
  <Grid gap={16} lg={4} md={6} sm={6} xl={3} xs={12}>
    {/* GridItem children */}
  </Grid>
</Stack>
```

Use `Stack` for vertical groups and simple horizontal toolbars. Use `Grid`
for responsive columns. Do not add `margin-bottom` to every child of a Stack;
it creates inconsistent edges and makes composition harder.

## Sass Tokens

For custom Sass that must align with iziUI base values:

```scss
@use '@iziui/react/scss/main.scss' as *;

.custom-surface {
  padding: calc($spacing * 2);
}
```

Static Sass tokens do not react to `ThemeProvider` updates. Use component
layout props or theme-aware `sx` values when a runtime theme value is needed.
