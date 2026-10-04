# Typography

Use `Typography` for visible interface text. It applies iziUI typography,
resolves theme color paths, and chooses HTML by `variant`.

| Variant | HTML | Use for |
| --- | --- | --- |
| `h1` | `h1` | One page title |
| `h2` | `h2` | Major page section |
| `h3` | `h3` | Card or subsection title |
| `h4`–`h6` | Matching heading | Deeper document levels only |
| `subtitle1`, `subtitle2` | `h6` | Subheading only when an `h6` is semantically correct |
| `body1` | `p` | Default readable body text |
| `body2` | `p` | Supporting text, metadata, and help text |

## Hierarchy

Use one `h1` for each page view. Never skip heading levels only to obtain a
visual size. Use `body1` or `body2` for non-heading labels and descriptions.

`subtitle1` and `subtitle2` render `h6`. Do not use them as generic small
text when doing so would create an invalid heading level.

```tsx
import { Stack, Typography } from '@iziui/react';

<Stack gap={8} tag="header">
  <Typography variant="h1">Game catalogue</Typography>
  <Typography color="text.secondary" variant="body1">
    Browse games available for your platform.
  </Typography>
</Stack>
```

## Color And Weight

`Typography` defaults to `color="text.primary"`. Use `text.secondary` for
supporting context and `text.disabled` only for unavailable content. Use
semantic colors sparingly for status that also has text or icon support.

`weight` accepts `light`, `normal`, or `bold`. Use weight to emphasize short
text, not to replace heading hierarchy. `textAlign` accepts CSS text-align
values for exceptional alignment needs.

```tsx
<Typography color="text.secondary" variant="body2" weight="bold">
  24 games found
</Typography>
```

Do not use raw heading tags for styled interface content when Typography can
express the required hierarchy.
