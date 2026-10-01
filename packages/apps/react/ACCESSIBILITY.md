# Accessibility Guide

iziUI React components provide semantic HTML, ARIA relationships, keyboard interaction, focus management, and announcements where the component owns that behavior. Applications remain responsible for meaningful content, validation rules, heading structure, and testing complete user flows.

This guide describes library behavior. It does not certify an application for WCAG conformance.

## Fields

`Input`, `Textarea`, and `Select` associate `label` with their native control. `helperText` and active errors are added to the control description. `error` sets `aria-invalid`.

```tsx
import { Input } from '@iziui/react';

<Input
  label="Email address"
  helperText="We use this address for account notices."
  error={hasEmailError}
  value={email}
  onChange={handleEmailChange}
/>;
```

Use visible labels for every field. Use `aria-label` only when a visible label would be redundant. Error text must explain how to correct the problem; color alone must not communicate an error.

`CheckboxGroup` renders a `fieldset` and uses `label` as its `legend`. Use it for related choices rather than grouping unrelated checkboxes visually.

```tsx
import { Checkbox, CheckboxGroup } from '@iziui/react';

<CheckboxGroup label="Notification channels" helperText="Choose at least one channel.">
  <Checkbox name="email" value="email">Email</Checkbox>
  <Checkbox name="sms" value="sms">SMS</Checkbox>
</CheckboxGroup>;
```

`InputFile` retains a native file input and provides a keyboard-operable upload trigger. Give it a descriptive `placeholder` or `aria-label`; it supports Enter and Space. When upload validation fails, provide `helperText` with corrective guidance and set `error`.

```tsx
import { InputFile } from '@iziui/react';

<InputFile
  aria-label="Upload proof of address"
  placeholder="Upload proof of address"
  files={files}
  onChange={setFiles}
/>;
```

`Select` uses a button combobox and a linked listbox. It supports ArrowUp, ArrowDown, Enter, Escape, and focus restoration to its trigger. When `name` and `value` are supplied, it renders a hidden form input; submit the selected value through that input rather than relying on a nested text input.

`Autocomplete` retains its combobox model. Provide labels, helper text, error text, and option content that explain the available choice.

## Menus And Overlays

`Menu` uses `role="menu"` by default. Menu items support ArrowUp, ArrowDown, Home, End, Enter, Space, and Escape. Escape closes the menu and returns focus to its anchor. Use an explicit role only when the popup follows a different ARIA pattern, such as a Select listbox.

`Drawer` and `Modal` render modal dialogs. Opening moves focus to the first enabled control, or to the dialog when it has no focusable content. Tab and Shift+Tab remain in the dialog; Escape and backdrop clicks call the existing close callback. After the close animation, focus returns to the trigger when it still exists and can receive focus.

Drawer content is arbitrary. Give every Drawer an accessible name with `aria-label` or `aria-labelledby`.

```tsx
import { Button, Drawer } from '@iziui/react';

<>
  <Button onClick={openFilters}>Filter accounts</Button>
  <Drawer
    open={filtersOpen}
    aria-label="Account filters"
    body={<FilterForm />}
    onClose={closeFilters}
  />
</>;
```

Modal titles receive an internal label relationship. Provide a concise title when possible; otherwise supply `aria-label` or `aria-labelledby`. The close control is named "Close modal".

```tsx
import { Button, Modal, Typography } from '@iziui/react';

<Modal
  isOpen={confirmOpen}
  title={<Typography variant="h2">Confirm withdrawal</Typography>}
  onClose={closeConfirm}
>
  <Button onClick={confirmWithdrawal}>Confirm</Button>
</Modal>;
```

## Feedback

`Alert` announces updates with `role="status"` by default. Pass `role="alert"` only for urgent interruptions. Dismissible alerts provide a named close control.

`Toast` uses `role="status"` for informational, success, warning, and primary messages. Error Toasts use `role="alert"`. Auto-dismiss pauses while pointer hover or keyboard focus is within the Toast and resumes only after both leave. Keep Toast text concise and avoid using Toast as the only record of critical information.

`Loading` uses `role="status"` and defaults to the name "Loading". Override its accessible name when the operation needs context.

```tsx
import { Loading } from '@iziui/react';

<Loading aria-label="Loading account history" />;
```

`Progress` exposes `role="progressbar"` and values from 0 through 100. Its visual width keeps the supplied `percent`; the announced value is clamped to the valid ARIA range. Include nearby text when users need a description of the operation or remaining work.

## Application Responsibilities

- Keep keyboard focus visible. Do not remove focus outlines without an equally visible replacement.
- Use one `h1` for each page view and maintain logical heading order with `Typography` heading variants or native headings.
- Pair color indicators with text, icons, or programmatic state. Errors, selected options, and warnings must not rely on color alone.
- Give icon-only controls, custom triggers, Drawers, and unnamed dialogs accessible names.
- Test complete keyboard, screen-reader, zoom, contrast, and error-recovery flows in the consuming application.
