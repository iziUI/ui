# Advanced And Experimental APIs

Use these APIs only when stable components and composition patterns do not
solve the requirement.

## Animations

`Bounce`, `Fade`, `Slide`, and `Zoom` are available from `@iziui/react` or
`@iziui/react/animations`. Their individual default paths are
`@iziui/react/animations/Bounce`, `Fade`, `Slide`, and `Zoom`.

Each animation requires `enter`. `Bounce`, `Slide`, and `Zoom` support
`direction="left" | "right" | "top" | "bottom"`; `Fade` does not. `delay`
uses milliseconds; `timeout` uses seconds.

Use animation only for non-essential visual feedback. The animation family
does not honor `prefers-reduced-motion`. `Slide` and `Zoom` can leave hidden
content mounted, so do not use them to hide focusable or required content.

## Hooks

- `useResize` calls optional `onXs`, `onSm`, `onMd`, `onLg`, and `onXl`
  callbacks for current responsive range.
- `useListenerResized(callback, deps)` runs a resize listener for cases that
  need direct window access.
- `useAccessibleDialog({ open, onClose, restoreAfterClose })` provides focus
  trapping, Escape handling, and focus restoration for a custom dialog.

Use `useAccessibleDialog` only when building a custom dialog is unavoidable.
It does not create dialog role, accessible name, overlay, portal, or scroll
locking. Prefer `Modal` or `Drawer` first.

## Experimental Lab Forms

Everything under `@iziui/react/lab` and `@iziui/react/lab/Form` is
experimental: `Form`, `useForm`, `useControl`, `useFormGroup`, `FormGroup`,
`FormControl`, `createControl`, and form control types.

Do not choose Lab forms as the default form solution. API stability,
accessibility guarantees, and error handling remain incomplete. Use native
form state with stable Input, Select, Checkbox, and Textarea components unless
the project explicitly accepts the experimental contract.
