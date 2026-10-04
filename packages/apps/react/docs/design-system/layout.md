# Layout

Use layout primitives in this order: `Container` for page width, `Stack` for
one-dimensional groups, `Grid` for responsive columns, and `Box` for a local
theme-aware wrapper.

| Need | Component | Decision |
| --- | --- | --- |
| Page width | `Container` | Wrap page main content once |
| Vertical section | `Stack` | Use column direction and gap |
| Toolbar | `Stack` | Use row direction, alignment, and gap |
| Responsive cards | `Grid` + `GridItem` | Use 1–12 spans |
| Local surface | `Box` | Use only when no higher primitive fits |

## Responsive Breakpoints

| Breakpoint | Viewport |
| --- | --- |
| `xs` | 599px or narrower |
| `sm` | 600px–899px |
| `md` | 900px–1199px |
| `lg` | 1200px–1535px |
| `xl` | 1536px or wider |

Grid spans range from `1` through `12`. Missing values inherit from wider
breakpoints toward narrower values: `xl`, `lg`, `md`, `sm`, then `xs`.

```tsx
import { Card, Container, Grid, GridItem, Stack, Typography } from '@iziui/react';

<Container tag="main">
  <Stack gap={32}>
    <Typography variant="h1">Game catalogue</Typography>
    <Grid gap={16} lg={3} md={4} sm={6} xl={3} xs={12}>
      {games.map((game) => (
        <GridItem key={game.id}>
          <Card>{game.title}</Card>
        </GridItem>
      ))}
    </Grid>
  </Stack>
</Container>
```

Set all breakpoint spans when a layout must not depend on fallback. Put Grid
span props on the parent only when every direct GridItem shares them. Put spans
on individual GridItem components for mixed card sizes.

Read [Layout Components](../components/layout.md) for defaults and component
props. Read [Spacing](./spacing.md) before selecting gaps.
