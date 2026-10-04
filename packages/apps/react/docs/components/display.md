# Display

```tsx
import {
  Avatar,
  Card,
  CardContent,
  Chip,
  Divider,
  Icon,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  Tooltip,
  Typography,
} from '@iziui/react';
```

## Card And CardContent

Use `Card` to group related content. Add `CardContent` when the group needs
standard inner padding. `CardContent` is optional.

```tsx
<Card>
  <CardContent>
    <Typography variant="h3">Game title</Typography>
    <Typography color="text.secondary" variant="body2">
      Available now
    </Typography>
  </CardContent>
</Card>
```

Passing `onClick` makes a Card keyboard-operable with button semantics. Use a
clickable Card only when its whole surface performs one action. Never nest
Button, link, input, or another interactive control inside a clickable Card.
Use a normal Card with an explicit Button for several actions.

## Typography

Use `Typography` for visible text. Main props are `variant`, `color`,
`weight`, and `textAlign`.

- Heading variants: `h1` through `h6` render matching heading elements.
- `subtitle1` and `subtitle2` render `h6` elements.
- `body1` and `body2` render paragraphs.
- `color` accepts a theme color path such as `text.primary` or `text.secondary`.
- `weight` accepts `light`, `normal`, or `bold`.

Read [Typography](../design-system/typography.md) for hierarchy decisions.

## Table Family

Use `Table` for dense tabular data, not for general card layout. Compose
`TableHeader`, `TableBody`, and `TableCell` inside it. `Table` already renders
an overflow-enabled `Card`, so do not wrap it in another `Card`.

```tsx
<Table>
  <TableHeader>
    <th scope="col">Title</th>
    <th scope="col">Platform</th>
  </TableHeader>
  <TableBody>
    <tr>
      <TableCell>Hades II</TableCell>
      <TableCell>PC</TableCell>
    </tr>
  </TableBody>
</Table>
```

`TableCell` renders `td` and supports `align="left" | "center" | "right"`.
Use native `th` elements inside `TableHeader` when the table needs accessible
column headers. Do not use a table for content that must reflow as cards on
small screens.

## Avatar

Use `Avatar` for a person, team, publisher, or other visual identity. Main
props are `src`, `alt`, `name`, `icon`, numeric `size`, `variant`, and `color`.
It prefers image source, then name initials, then supplied icon.

Use `variant="circular"` for people and `variant="rounded"` for products or
organizations. Do not attach `onClick`; Avatar is not an accessible button.

## Chip

Use `Chip` for a compact label, category, state, or removable filter. It
requires `label`. Main props are `size`, `color`, `variant`, `icon`, and
`onDelete`.

Use `onDelete` only for a removable selected value. Do not use clickable Chip
as a primary action; use `Button` or a native control instead because Chip
does not provide full keyboard button interaction.

## Icon

Use `Icon` for a visual symbol. It requires a Unicons `name`; `size` defaults
to `24`; `color` accepts a semantic color name. Ensure the application loads
the icon font or CSS required by the selected icon names.

Decorative icons need `aria-hidden="true"`. Functional icons belong inside a
named `ButtonIcon` or labeled Button.

## Divider

Use `Divider` as a visual boundary between related groups. It renders a
generic element, not a semantic `hr`; do not rely on it to convey structure
to assistive technology.

## Tooltip

Use `Tooltip` for brief optional help. It requires `label`, wraps one child,
and supports `top`, `right`, `bottom` (default), or `left` `direction`.

```tsx
<Tooltip label="Open game details" direction="top">
  <ButtonIcon aria-label="Open game details" type="button">
    <Icon name="external-link-alt" />
  </ButtonIcon>
</Tooltip>
```

Tooltip opens on hover only. Do not put required instructions, field labels,
or accessible names exclusively in Tooltip.
