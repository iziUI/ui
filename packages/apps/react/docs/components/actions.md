# Actions

```tsx
import { Button, ButtonIcon, Icon } from '@iziui/react';
```

Use actions to initiate a user operation. Use native button semantics instead
of clickable containers.

## Button

Use `Button` for labeled actions such as save, create, cancel, or retry.

```tsx
<Button color="primary" type="button" variant="contained">
  Save changes
</Button>
```

Main props:

- `variant`: `contained` (default), `outlined`, or `text`.
- `color`: `primary` (default), `secondary`, `success`, `warning`, `error`, `info`, or `grey`.
- `size`: `small`, `medium` (default), or `large`.
- `startIcon` and `endIcon`: one `<Icon />` or another compatible icon element.
- `loading`: `true` for default indicator, or a custom `<Loading />` element.

Use `type="button"` inside forms unless the action submits the form. Native
buttons default to `type="submit"`.

`loading` replaces visible content, disables the button, and suppresses its
click handler. Give a loading action an accessible name and `aria-busy`:

```tsx
<Button aria-busy aria-label="Saving changes" loading type="button">
  Save changes
</Button>
```

Do not use `Button` as navigation when application routing provides a link.
Do not create a second click target inside a Button.

## ButtonIcon

Use `ButtonIcon` for an action with no visible text. Its only child must be
an `Icon` element. `size` is a numeric pixel dimension and defaults to `40`.

```tsx
<ButtonIcon aria-label="Close filters" type="button" variant="outlined">
  <Icon name="times" />
</ButtonIcon>
```

Always provide `aria-label` or `aria-labelledby`. Do not use `ButtonIcon` for
decorative icons; render `Icon` directly instead.

## Ripple

`Ripple` adds a visual pointer effect. `Button`, `ButtonIcon`, and clickable
`Card` already compose it. Do not use `Ripple` as an independent control: it
does not provide focus, keyboard interaction, or accessible semantics.

## Related Components

- Use `Alert` for a persistent action result.
- Use `Toast` for transient result feedback.
- Use `Loading` with `Button.loading` for a busy action.
- Use `Tooltip` only to supplement an icon action, never to provide its name.
