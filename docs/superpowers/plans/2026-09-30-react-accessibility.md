# React Accessibility Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bring iziUI React fields, overlays, feedback, and consumer documentation to a WCAG 2.2 AA baseline without breaking public APIs.

**Architecture:** Add small internal helpers for stable field relationships and dialog focus management. Apply those helpers to existing components, preserve their public props and close behavior, and prove behavior through React Testing Library keyboard, focus, and ARIA tests. Document only the resulting supported behavior.

**Tech Stack:** React 19, TypeScript, Jest, React Testing Library, user-event, existing iziUI components and styles.

**Spec:** `docs/superpowers/specs/2026-09-30-accessibility-design.md`

## Global Constraints

- Meet WCAG 2.2 AA requirements described in the spec.
- Preserve existing public props, callbacks, visuals, and backdrop-close behavior.
- Add no dependencies and do not add a focus-management library.
- Keep internal helpers out of public package exports.
- Use React Testing Library and user-event for user-observable accessibility behavior.
- Document only public imports and verified component behavior.
- Do not commit unless the user explicitly requests a commit.

## Review Focus

- A supplied `aria-describedby` must remain present when helper and error IDs are added. Task 1 tests merged IDs.
- Disabled menu and select options must not become active or run click handlers during arrow-key navigation. Task 4 tests skipping disabled items.
- A dialog with no focusable descendants must focus its dialog container and retain focus on Tab. Task 5 tests this fallback.
- Closing an overlay after its animation must restore focus only when the original trigger is still connected and focusable. Task 5 tests a removed trigger.
- Progress values below 0 or above 100 must expose clamped ARIA values without changing the visual `percent` contract. Task 6 tests both bounds.

---

## File Structure

- `packages/apps/react/src/fields/useFieldAccessibility.ts`: internal stable IDs and field ARIA relationships.
- `packages/apps/react/src/hooks/useAccessibleDialog/`: internal focus trap, Escape handling, and focus restoration for Drawer and Modal.
- `packages/apps/react/src/fields/`: field components and their behavior tests.
- `packages/apps/react/src/navigation/Menu/`: generic popup menu semantics and Select integration.
- `packages/apps/react/src/navigation/Drawer/` and `packages/apps/react/src/feedback/Modal/`: dialog semantics and focus tests.
- `packages/apps/react/src/feedback/`: feedback roles, announcements, and tests.
- `packages/apps/react/ACCESSIBILITY.md`: consumer guide.
- `packages/apps/react/README.md`: link to accessibility guide.

### Task 1: Field Relationship Helper, Input, and Textarea

**Files:**
- Create: `packages/apps/react/src/fields/useFieldAccessibility.ts`
- Create: `packages/apps/react/src/fields/Input/Input.spec.tsx`
- Modify: `packages/apps/react/src/fields/Input/Input.tsx`
- Modify: `packages/apps/react/src/fields/Textarea/Textarea.tsx`
- Modify: `packages/apps/react/src/fields/Textarea/Textarea.spec.tsx`

**Interfaces:**
- Produces: `useFieldAccessibility({ id, helperText, error, ariaDescribedBy })` returning `controlId`, `helperTextId`, `describedBy`, and `ariaInvalid`.
- Consumes: native `id`, `aria-describedby`, `aria-invalid`, and `required` props already accepted by Input and Textarea.

- [ ] **Step 1: Write failing field relationship tests**

Test Input and Textarea with a consumer ID, label, helper text, and `error`. Assert the label resolves to the control, helper text has an ID referenced from `aria-describedby`, error sets `aria-invalid="true"`, and a consumer `aria-describedby="external-help"` is retained.

- [ ] **Step 2: Run focused tests to verify failure**

Run: `make run react test -- src/fields/Input/Input.spec.tsx src/fields/Textarea/Textarea.spec.tsx`

Expected: FAIL because labels have no `htmlFor` relationship and descriptions are not linked.

- [ ] **Step 3: Implement `useFieldAccessibility` and integrate it**

Use React `useId` only when a consumer does not provide `id`. Build a whitespace-delimited, duplicate-free `aria-describedby` from consumer value and generated helper ID. Render helper text only when supplied. Apply generated IDs to Input and Textarea label, native control, and helper text.

- [ ] **Step 4: Run focused tests to verify pass**

Run: `make run react test -- src/fields/Input/Input.spec.tsx src/fields/Textarea/Textarea.spec.tsx`

Expected: PASS.

### Task 2: Checkbox and CheckboxGroup Semantics

**Files:**
- Modify: `packages/apps/react/src/fields/Checkbox/Checkbox.tsx`
- Modify: `packages/apps/react/src/fields/Checkbox/Checkbox.spec.tsx`
- Modify: `packages/apps/react/src/fields/CheckboxGroup/CheckboxGroup.tsx`
- Modify: `packages/apps/react/src/fields/CheckboxGroup/CheckboxGroup.spec.tsx`

**Interfaces:**
- Consumes: `useFieldAccessibility` from Task 1.
- Produces: optional `id`, `label`, `helperText`, and `error` support on CheckboxGroup without changing current child or `onChange` behavior.

- [ ] **Step 1: Write failing Checkbox and CheckboxGroup accessibility tests**

Assert Checkbox accepts a consumer `id`, links its helper/error text through `aria-describedby`, and sets `aria-invalid` when `error` is true. Assert CheckboxGroup renders a `fieldset`, uses its optional `label` as a `legend`, and links group helper/error text without changing child checkbox names or emitted selected values.

- [ ] **Step 2: Run focused tests to verify failure**

Run: `make run react test -- src/fields/Checkbox/Checkbox.spec.tsx src/fields/CheckboxGroup/CheckboxGroup.spec.tsx`

Expected: FAIL because Checkbox fixes its ID to `name` and CheckboxGroup has no group semantics.

- [ ] **Step 3: Add group semantics and field relationships**

Let Checkbox use an explicit `id` when provided and retain `name` as the fallback ID. Add optional group label, helper text, error, and ID props to CheckboxGroup. Render its existing Stack inside a `fieldset`; only render `legend` when a label exists. Preserve generic `onChange` output and current generated child names.

- [ ] **Step 4: Run focused tests to verify pass**

Run: `make run react test -- src/fields/Checkbox/Checkbox.spec.tsx src/fields/CheckboxGroup/CheckboxGroup.spec.tsx`

Expected: PASS.

### Task 3: InputFile and Autocomplete Accessibility

**Files:**
- Modify: `packages/apps/react/src/fields/InputFile/InputFile.tsx`
- Modify: `packages/apps/react/src/fields/InputFile/InputFile.spec.tsx`
- Modify: `packages/apps/react/src/fields/Autocomplete/Autocomplete.tsx`
- Modify: `packages/apps/react/src/fields/Autocomplete/Autocomplete.spec.tsx`

**Interfaces:**
- Consumes: `useFieldAccessibility` from Task 1 and existing InputFile/Autocomplete props.
- Produces: keyboard-operable file picker, announced file errors, and complete Autocomplete field relationships.

- [ ] **Step 1: Write failing InputFile and Autocomplete tests**

Test that InputFile exposes an accessible name, activates its hidden/native file input with Enter and Space, and announces an active error. Test Autocomplete label association, helper/error description IDs, `aria-invalid`, ArrowDown active option state, Enter selection, Escape close, and focus remaining on its input after close.

- [ ] **Step 2: Run focused tests to verify failure**

Run: `make run react test -- src/fields/InputFile/InputFile.spec.tsx src/fields/Autocomplete/Autocomplete.spec.tsx`

Expected: FAIL because the file drop target has no keyboard activation and Autocomplete has no field description relationships.

- [ ] **Step 3: Implement accessible file trigger and complete Autocomplete ARIA**

Make the visible InputFile drop target keyboard focusable and call the existing input click path for Enter and Space. Keep drag-and-drop behavior. Give its error message an assertive announcement. Apply the Task 1 helper to Autocomplete, retain its current combobox attributes, skip disabled options in keyboard navigation, and close after successful keyboard selection.

- [ ] **Step 4: Run focused tests to verify pass**

Run: `make run react test -- src/fields/InputFile/InputFile.spec.tsx src/fields/Autocomplete/Autocomplete.spec.tsx`

Expected: PASS.

### Task 4: Menu, Select, and Option Keyboard Semantics

**Files:**
- Modify: `packages/apps/react/src/navigation/Menu/Menu.tsx`
- Modify: `packages/apps/react/src/navigation/Menu/MenuButton.tsx`
- Modify: `packages/apps/react/src/navigation/Menu/Menu.spec.tsx`
- Modify: `packages/apps/react/src/fields/Select/Select.tsx`
- Modify: `packages/apps/react/src/fields/Select/Option.tsx`
- Modify: `packages/apps/react/src/fields/Select/Select.spec.tsx`

**Interfaces:**
- Consumes: existing `useMenu` tuple and `MenuProps.role` support from HTML attributes.
- Produces: Menu keyboard navigation and focus restoration; Select button trigger with linked listbox and hidden form input.

- [ ] **Step 1: Write failing menu and select interaction tests**

Assert Menu exposes `role="menu"` by default, MenuButton exposes `role="menuitem"`, ArrowUp and ArrowDown skip disabled items, Enter and Space activate the focused item, Escape closes and restores focus to `anchorEl`. Assert Select has a button combobox with `aria-expanded` and `aria-controls`, a linked `role="listbox"`, option selected state, no nested text input in the button, and a hidden input carrying `name` and selected value.

- [ ] **Step 2: Run focused tests to verify failure**

Run: `make run react test -- src/navigation/Menu/Menu.spec.tsx src/fields/Select/Select.spec.tsx`

Expected: FAIL because Menu has no default role or keyboard handler and Select nests an input inside its button.

- [ ] **Step 3: Implement popup semantics without changing selection callbacks**

Keep Menu generic: default to `menu`, preserve a caller role override, give only MenuButton default `menuitem` semantics, and use roving focus for enabled button children. Handle Escape, ArrowUp, ArrowDown, Home, End, Enter, and Space while open; call existing `onClose` and restore `anchorEl` focus.

Refactor Select to use a single button trigger, hidden form input, and Menu with `role="listbox"`. Clone Options with `role="option"`, selected and disabled ARIA state, then preserve `onChange` and `onValueChange` callback timing.

- [ ] **Step 4: Run focused tests to verify pass**

Run: `make run react test -- src/navigation/Menu/Menu.spec.tsx src/fields/Select/Select.spec.tsx`

Expected: PASS.

### Task 5: Accessible Dialog Hook, Drawer, and Modal

**Files:**
- Create: `packages/apps/react/src/hooks/useAccessibleDialog/useAccessibleDialog.ts`
- Create: `packages/apps/react/src/hooks/useAccessibleDialog/useAccessibleDialog.spec.tsx`
- Create: `packages/apps/react/src/hooks/useAccessibleDialog/index.ts`
- Modify: `packages/apps/react/src/hooks/index.ts`
- Modify: `packages/apps/react/src/navigation/Drawer/Drawer.tsx`
- Modify: `packages/apps/react/src/navigation/Drawer/Drawer.spec.tsx`
- Modify: `packages/apps/react/src/feedback/Modal/Modal.tsx`
- Modify: `packages/apps/react/src/feedback/Modal/Modal.spec.tsx`

**Interfaces:**
- Produces: `useAccessibleDialog({ open, onClose, restoreAfterClose })` returning a dialog ref and focus/keyboard handlers for the dialog element.
- Consumes: existing Drawer `open` and Modal `isOpen` state plus their current exit durations.

- [ ] **Step 1: Write failing dialog hook and component tests**

Test hook behavior through Drawer and Modal: each renders `role="dialog"` and `aria-modal="true"`; Modal title creates `aria-labelledby`; consumer-supplied Drawer `aria-label` remains present; opening focuses first enabled control; Tab and Shift+Tab cycle within content; Escape calls `onClose`; backdrop click still calls `onClose`; after close animation, focus returns to trigger. Include a dialog with no focusable descendants and a removed trigger case from Review Focus.

- [ ] **Step 2: Run focused tests to verify failure**

Run: `make run react test -- src/navigation/Drawer/Drawer.spec.tsx src/feedback/Modal/Modal.spec.tsx`

Expected: FAIL because components have no dialog semantics, keyboard close, trap, or restoration.

- [ ] **Step 3: Implement `useAccessibleDialog` and integrate overlays**

Use a ref on the semantic dialog container. On visible open, capture `document.activeElement`, focus the first enabled focusable descendant or the dialog with `tabIndex={-1}`, and attach Escape/Tab handlers. Restore focus only after the component marks itself invisible and only if the captured element is connected and focusable.

Set Drawer and Modal dialog roles and modal state. Wrap Modal title with a generated ID. Give Modal close ButtonIcon a fixed accessible name. Keep backdrop click and animation timing unchanged.

- [ ] **Step 4: Run focused tests to verify pass**

Run: `make run react test -- src/navigation/Drawer/Drawer.spec.tsx src/feedback/Modal/Modal.spec.tsx`

Expected: PASS.

### Task 6: Feedback Roles and Announcements

**Files:**
- Create: `packages/apps/react/src/feedback/Alert/Alert.spec.tsx`
- Modify: `packages/apps/react/src/feedback/Alert/Alert.tsx`
- Create: `packages/apps/react/src/feedback/Loading/Loading.spec.tsx`
- Modify: `packages/apps/react/src/feedback/Loading/Loading.tsx`
- Modify: `packages/apps/react/src/feedback/Toast/Toast.tsx`
- Modify: `packages/apps/react/src/feedback/Toast/ToastProvider.tsx`
- Modify: `packages/apps/react/src/feedback/Toast/Toast.spec.tsx`
- Modify: `packages/apps/react/src/feedback/Progress/Progress.tsx`
- Modify: `packages/apps/react/src/feedback/Progress/Progress.spec.tsx`

**Interfaces:**
- Consumes: current Alert close callback, Toast color/delay, Loading HTML attributes, and Progress `percent`.
- Produces: status/alert announcements, named close controls, focus-aware toast timing, and progressbar values.

- [ ] **Step 1: Write failing feedback accessibility tests**

Assert Alert defaults to `role="status"`, preserves consumer role overrides, and names its close button. Assert Loading exposes `role="status"` and preserves or defaults its accessible name. Assert informational Toast has status semantics, error Toast has alert semantics, and auto-dismiss pauses on focus as well as hover. Assert Progress exposes progressbar role and `aria-valuemin`, `aria-valuemax`, and clamped `aria-valuenow` for `-1`, `50`, and `101`.

- [ ] **Step 2: Run focused tests to verify failure**

Run: `make run react test -- src/feedback/Alert/Alert.spec.tsx src/feedback/Loading/Loading.spec.tsx src/feedback/Toast/Toast.spec.tsx src/feedback/Progress/Progress.spec.tsx`

Expected: FAIL because feedback components lack default semantics and Progress drops ARIA attributes.

- [ ] **Step 3: Implement feedback semantics**

Forward non-style HTML attributes to Toast's Alert. Default Alert and Loading roles only when callers do not provide one. Add an accessible name to Alert close control. Use error Toast color to choose alert priority and all other colors to choose status priority. Pause and resume the existing Toast timer on focus transitions without creating duplicate timers. Forward Progress props to its outer Box and calculate a separate clamped ARIA value without changing bar width behavior.

- [ ] **Step 4: Run focused tests to verify pass**

Run: `make run react test -- src/feedback/Alert/Alert.spec.tsx src/feedback/Loading/Loading.spec.tsx src/feedback/Toast/Toast.spec.tsx src/feedback/Progress/Progress.spec.tsx`

Expected: PASS.

### Task 7: Consumer Accessibility Guide

**Files:**
- Create: `packages/apps/react/ACCESSIBILITY.md`
- Modify: `packages/apps/react/README.md`

**Interfaces:**
- Consumes: verified behavior from Tasks 1 through 6.
- Produces: public consumer guidance linked from the React README.

- [ ] **Step 1: Draft guide examples from implemented public APIs**

Document component guarantees and consumer responsibilities. Include public-import examples for field label/help/error relationships, CheckboxGroup legends, InputFile labels, Select/Menu keyboard behavior, Drawer/Modal accessible names, feedback announcements, visible focus, heading order, and color-independent errors.

- [ ] **Step 2: Add guide link to React README**

Add a concise accessibility-guide link near the existing accessibility notes. Do not duplicate the guide's examples in the README.

- [ ] **Step 3: Verify documentation links and package commands**

Run: `make run react test && make run react typecheck && make run react lint && make run react build-storybook && git diff --check`

Expected: all commands exit 0; no broken relative links or whitespace errors.

## Plan Self-Review

Spec coverage: Tasks 1-3 cover fields, Task 4 covers menu and Select, Task 5 covers Drawer and Modal, Task 6 covers feedback, and Task 7 covers consumer documentation. All spec sections have an owning task.

Step scan: Each task starts with a failing user-observable test, verifies red, implements one component group, and verifies green. No task includes a commit because the user has not requested one.

Type consistency: Task 1 defines `useFieldAccessibility`; Tasks 2 and 3 consume it. Task 5 defines `useAccessibleDialog`; Drawer and Modal consume it. No helper is public.

Review focus: Each listed high-risk behavior has a named owning task and test requirement.

Proportion: The plan specifies interfaces, files, and behavior without prescribing implementation bodies beyond accessibility algorithms that require exact sequencing.
