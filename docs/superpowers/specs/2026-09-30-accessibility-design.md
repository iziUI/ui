# React Accessibility Design

## Goal

Bring the public React component library to a documented WCAG 2.2 AA baseline for forms, overlays, feedback, keyboard operation, and focus management. Preserve existing public props and add accessible behavior without new dependencies.

## Scope

The work covers these component groups:

- Fields: Input, Textarea, Checkbox, CheckboxGroup, InputFile, Select, and Autocomplete.
- Overlays: Menu, Drawer, and Modal.
- Feedback: Alert, Toast, Loading, and Progress.
- Documentation: a React accessibility guide linked from the React README.
- Tests: React Testing Library coverage for semantics, keyboard operation, and focus behavior.

The work does not redesign component appearance, replace existing APIs, add a third-party focus-management library, or certify an application that consumes iziUI.

## Accessibility Contract

Components provide correct semantic elements, ARIA state, keyboard operation, focus management, and live announcements where they own the behavior. Consumers provide meaningful labels, error text, valid option content, and application-specific validation rules.

The public API remains backward compatible. Existing labels, helper text, open state, callbacks, and close-on-backdrop behavior continue to work. New DOM IDs, ARIA attributes, roles, and keyboard handlers are additive.

## Shared Internals

### Field Accessibility

A small internal field helper will derive stable IDs with React `useId`. It will preserve a consumer-provided `id` and generate IDs only when required.

The helper will merge a consumer-provided `aria-describedby` with helper-text and error-message IDs. It will set `aria-invalid` when an error is active. A visual label will use `htmlFor` to associate with its control.

### Dialog Accessibility

A reusable internal dialog hook will support Drawer and Modal. When an overlay opens, it records the previously focused element, focuses the first enabled focusable descendant, and focuses the dialog container when no descendant is focusable. While open, Tab and Shift+Tab remain inside the dialog. Escape calls the existing close callback. After the exit animation completes, focus returns to the original trigger when it is still connected and focusable.

The hook does not modify document structure or introduce portals. It only manages focus and keyboard listeners while an overlay is visible.

## Fields

### Input, Textarea, and Checkbox

`label` associates with the native control. Helper text and error text receive stable IDs and are included in `aria-describedby`. `error` sets `aria-invalid` on the native control. Existing native keyboard and focus behavior remains unchanged.

### CheckboxGroup

Checkbox groups render as a `fieldset` with an accessible `legend` when a group label is provided. Error and helper text attach to the group through `aria-describedby`. Individual Checkbox behavior remains native.

### InputFile

The file picker retains its native input. Its visible trigger becomes keyboard-operable with Enter and Space, exposes an accessible name, and forwards focus to the file input. Upload errors use an announced error message rather than CSS state alone.

### Select and Autocomplete

Select uses a button trigger with combobox state and a linked listbox. The current invalid nested input inside the trigger is replaced by a hidden form input when a `name` and value are supplied. The trigger exposes `aria-expanded`, `aria-controls`, and `aria-invalid` when applicable.

Select and Autocomplete support ArrowUp, ArrowDown, Enter, Escape, and focus restoration to the trigger. Options expose selected and disabled state. Autocomplete retains its existing combobox model and gains the shared field description and error relationships.

## Menu and Overlays

### Menu

Menu exposes a menu role by default, accepts an explicit role when it is used as another popup pattern, and links to its trigger through caller-provided ARIA IDs. Menu items receive menuitem semantics when used with the Menu item API. Escape closes the menu and restores focus to its anchor. Arrow keys move between enabled items; Enter and Space activate the focused item.

### Drawer and Modal

Drawer and Modal render `role="dialog"` with `aria-modal="true"`. A Modal title receives an internal ID and becomes `aria-labelledby`. Drawer consumers provide `aria-label` or `aria-labelledby` because Drawer headers are arbitrary React elements. The existing close button receives an accessible name. Backdrop clicks keep their current close behavior.

Both components use the shared dialog focus behavior. The dialog itself remains focusable when it has no focusable content.

## Feedback

Alert accepts caller-supplied ARIA props and defaults to a non-interrupting status announcement. Alert close controls have an accessible name.

Toast forwards relevant ARIA props to Alert. Informational toast messages use `role="status"`; error toast messages use `role="alert"`. Auto-dismiss pauses on pointer hover and keyboard focus, then resumes when neither condition applies. ToastProvider exposes the live region through rendered Toast instances.

Loading exposes `role="status"` and supports an accessible label. Progress exposes `role="progressbar"`, `aria-valuemin="0"`, `aria-valuemax="100"`, and a clamped `aria-valuenow` derived from `percent`.

## Tests

Tests use React Testing Library and user-event where interaction is required. Coverage includes:

- Label, helper, and error relationships for fields.
- Native and custom-control keyboard operation.
- Menu and Select state, arrow navigation, activation, Escape, and focus restoration.
- Drawer and Modal dialog naming, focus entry, focus trap, Escape, backdrop close, and focus restoration.
- Alert, Toast, Loading, and Progress roles, names, announcements, and progress values.

Tests assert user-visible behavior and accessible semantics rather than internal classes.

## Documentation

Create `packages/apps/react/ACCESSIBILITY.md` and link it from the React README. The guide documents:

- Component guarantees and consumer responsibilities.
- Accessible field labels, help, errors, and groups.
- Menu, Select, Drawer, and Modal keyboard and focus behavior.
- Alert, Toast, Loading, and Progress announcement behavior.
- Requirements for accessible names, visible focus, color-independent errors, and application-level heading order.

Examples use public `@iziui/react` imports and avoid repository source paths.

## Compatibility and Release Notes

The changes add semantic behavior and do not remove exports or props. Consumer tests that assert Select's nested input must target the trigger or hidden form input instead. The accessibility guide will call out the Select hidden input and new overlay roles. The React README and accessibility guide will describe required consumer labels for Drawer and other arbitrary-content overlays.
