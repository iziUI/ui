# Colors

Use semantic colors to communicate role, not decoration. Theme values come
from `createTheme` and are available to components and `sx` callbacks.

## Semantic Families

Components that accept `color` support:

- `primary`: main product action or selected state.
- `secondary`: secondary product emphasis.
- `success`: completed or confirmed state.
- `warning`: caution requiring attention.
- `error`: failed, invalid, or destructive state.
- `info`: neutral informative state.
- `grey`: neutral visual treatment.

Each family has `main`, `light`, `dark`, `opacity`, and `contrast` values in
the theme palette, for example `theme.palette.primary.main`.

```tsx
<Stack flexDirection="row" gap={12}>
  <Button color="primary" type="button">Save</Button>
  <Button color="error" type="button" variant="outlined">Delete</Button>
</Stack>
```

## Text, Background, And Borders

Use these theme paths with Typography or `sx`:

- `text.primary`: default readable text.
- `text.secondary`: supporting metadata and descriptions.
- `text.disabled`: unavailable content.
- `background.default`: application canvas.
- `background.paper`: elevated surface such as card or panel.
- `background.muted`: lower-emphasis surface.
- `divider`: border or separator color.

```tsx
<Box
  sx={{
    background: ({ background }) => background.paper,
    borderColor: ({ divider }) => divider,
    borderRadius: 1,
    p: 2,
  }}
>
  <Typography color="text.primary" variant="body1">Game details</Typography>
</Box>
```

Do not use color as the only status indicator. Pair error, warning, and
selection colors with text, icons, or programmatic state.

## Customize Theme

```tsx
import { createTheme } from '@iziui/react';

const theme = createTheme({
  palette: {
    primary: '#6C37F4',
    secondary: '#3451B2',
  },
});
```

Palette overrides are shallow. When overriding `text` or `background`, supply
every field in that nested object. Do not hardcode colors in component props
when a semantic family or theme path expresses the same role.
