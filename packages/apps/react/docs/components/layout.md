# Layout Components

```tsx
import { Box, Container, Grid, GridItem, Stack } from '@iziui/react';
```

Choose a layout primitive before adding custom CSS.

| Need | Use | Avoid |
| --- | --- | --- |
| Centered page width | `Container` | Repeating page width styles |
| One-dimensional row or column | `Stack` | Margins on every child |
| Responsive columns | `Grid` with direct `GridItem` children | Nested manual CSS grids |
| Local wrapper styling | `Box` | Rebuilding Stack or Grid behavior |

## Container

Use `Container` as the outer page wrapper. It centers content and chooses a
maximum width by breakpoint. Defaults are `sm="100%"`, `md={750}`, and
`lg={950}`. Override these only for a deliberate page-width requirement.

```tsx
<Container tag="main">
  <Typography variant="h1">Games</Typography>
</Container>
```

## Stack

Use `Stack` for direct children arranged in one row or one column. Defaults:
`tag="div"`, `flexDirection="column"`, `gap={16}`, `alignItems="flex-start"`,
and `justifyContent="flex-start"`.

```tsx
<Stack gap={24} tag="section">
  <Typography variant="h2">Featured games</Typography>
  <Stack alignItems="center" flexDirection="row" gap={12}>
    <Button type="button">Filter</Button>
    <Button type="button" variant="text">Clear</Button>
  </Stack>
</Stack>
```

`gap` is a direct CSS pixel value. Prefer `gap` over `margin` on every child.
Use `flexWrap="wrap"` only when a row may wrap without requiring grid spans.

## Grid And GridItem

Use `Grid` for responsive columns. Its direct children must be `GridItem`.
Set parent breakpoint spans when all items share them; set spans on individual
GridItem components when items differ.

```tsx
<Grid gap={16} lg={3} md={4} sm={6} xl={3} xs={12}>
  <GridItem><Card>...</Card></GridItem>
  <GridItem><Card>...</Card></GridItem>
</Grid>
```

Spans range from `1` through `12`. `Grid` has `gap={15}` by default. Missing
spans inherit from wider breakpoints in order: `xl`, `lg`, `md`, `sm`, then
`xs`. Set each breakpoint explicitly when fallback is not intended.

`GridItem` defaults to `xl={1}`. It also supports `gridColumnStart`,
`gridRowStart`, `alignSelf`, and `justifyItems` for exceptional placement.
Use those placement props sparingly; change grid structure before positioning
individual cards manually.

## Box

Use `Box` for a semantic wrapper with localized `sx` values when no other
layout primitive owns the job. Set `tag` to preserve element meaning.

```tsx
<Box
  sx={{
    background: ({ background }) => background.paper,
    borderRadius: 1,
    p: 2,
  }}
  tag="aside"
>
  <Typography variant="h2">Filters</Typography>
</Box>
```

Do not use Box to replace `Stack`, `Grid`, or `Container`. Read
[Design System Layout](../design-system/layout.md) before using `sx` for page
structure.
