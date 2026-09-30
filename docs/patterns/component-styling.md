# Component Styling

## Rule

- Prefer `sx` over `style` when iziUI supports property.
- Use `sx` for theme-aware color, spacing, shape, and elevation values.
- Use `style` only when `sx` does not support CSS property or required value, such as dimensions, font size, border style,
  and percentage border radius.
- Do not use CSS custom properties in `style` when `sx` can derive same value from theme.

```tsx
<Card
  sx={{
    background: ({ primary }) => primary.main,
    borderRadius: 1,
    boxShadow: 'sm',
    p: 2,
  }}
  style={{ minHeight: 120 }}
>
  Content
</Card>
```

## Supported `sx` Properties

- Colors: `background`, `backgroundColor`, `borderColor`, `color`.
- Shape: `borderRadius`.
- Spacing: `p`, `px`, `py`, `pt`, `pr`, `pb`, `pl`, `m`, `mx`, `my`, `mt`, `mr`, `mb`, `ml`.
- Elevation: `boxShadow` with `sm`, `md`, or `lg`.

`background`, `backgroundColor`, `borderColor`, and `color` receive theme palette in callback.
