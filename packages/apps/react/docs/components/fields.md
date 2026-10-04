# Fields

```tsx
import {
  Autocomplete,
  AutocompleteButton,
  Checkbox,
  CheckboxGroup,
  ColorPicker,
  Input,
  InputFile,
  Option,
  Select,
  Stack,
  Switch,
  Textarea,
} from '@iziui/react';
```

Use visible `label` text, `helperText` for guidance, and `error` with text
that explains correction. Read the full [Accessibility Guide](../../ACCESSIBILITY.md)
before using fields in a complete flow.

## Input And Textarea

Use `Input` for one-line native input types. Use `Textarea` for multi-line
text. Both forward native control props and support `label`, `helperText`,
`error`, `width`, `startIcon`, and `endIcon`.

```tsx
<Stack gap={16}>
  <Input
    error={Boolean(titleError)}
    helperText={titleError || 'Use game title shown in the catalogue.'}
    label="Title"
    onChange={(event) => setTitle(event.target.value)}
    value={title}
  />
  <Textarea label="Description" rows={4} value={description} />
</Stack>
```

Use native `type` values such as `email`, `password`, or `search` when they
match input purpose. An interactive icon passed to `startIcon` or `endIcon`
must be an independently named control.

## Select And Option

Use `Select` for a short, known set of choices. Compose direct `Option`
children. `Option.value` and `Select.value` are `string | number`.

```tsx
<Select
  label="Platform"
  onValueChange={setPlatform}
  placeholder="Choose a platform"
  value={platform}
>
  <Option value="pc">PC</Option>
  <Option value="playstation">PlayStation</Option>
  <Option value="xbox">Xbox</Option>
</Select>
```

Use `name` with `value` when a native form submission needs the selected
value in a hidden input. `required` shows a required marker; application
validation still owns form validity. Do not use arbitrary elements as Option
children.

## Autocomplete And AutocompleteButton

Use `Autocomplete` when users search or filter a list. It requires `options`,
`onChange`, and `renderOption`. `onChange` receives the selected option object
or `undefined` when the value clears.

```tsx
type Game = { id: string; title: string };

<Autocomplete<Game>
  label="Game"
  onChange={setGame}
  options={games}
  renderOption={(game) => (
    <AutocompleteButton value={game.id}>
      {game.title}
    </AutocompleteButton>
  )}
/>
```

`AutocompleteButton` is only for `renderOption`. Its `value` must be a
`string` or `number`; pass an identifier, not the complete option object.
Autocomplete selection still returns the original object from `options`.

Use `onSearch` for remote search; it receives debounced input and disables
the component's local filtering. Use `filterOptions` for local filtering.
Do not rely on Autocomplete to serialize its selected object in a native form.

## Checkbox And CheckboxGroup

Use `Checkbox` for one independent Boolean choice. It requires `name` and
`label`. Use one unique `name` for each standalone checkbox.

Use `CheckboxGroup` for related multiple choices. It renders a fieldset and
uses `label` as its legend. Children must be direct `Checkbox` elements.

```tsx
<CheckboxGroup
  label="Platforms"
  onChange={(items) => setSelectedPlatforms(
    items.filter((item) => item.checked).map((item) => item.id),
  )}
  values={selectedPlatforms}
>
  <Checkbox label="PC" name="pc" value="pc" />
  <Checkbox label="PlayStation" name="playstation" value="playstation" />
</CheckboxGroup>
```

`CheckboxGroup.values` matches checkbox `name` values. Its callback returns
every item object with its `checked` state; map checked item `id` values before
updating `values`. Do not group unrelated checkboxes only for visual alignment.

## Switch

Use `Switch` only for a controlled Boolean setting when its current
accessibility limitations are acceptable. Supply `checked` and update it in
`onChange`.

Do not use `Switch` for accessibility-critical settings: its hidden native
input does not provide reliable keyboard and error-description behavior. Use
`Checkbox` when an accessible Boolean choice is required. Do not rely on the
documented `auto` prop; it has no runtime behavior.

## InputFile

Use `InputFile` for externally controlled file selection. It requires a
`files: File[]` value and accepts `onChange(files)`, `multiple`, `accept`,
`placeholder`, `helperText`, `error`, `success`, and `renderFiles`.

```tsx
<InputFile
  accept="image/*"
  aria-label="Upload cover image"
  files={coverFiles}
  helperText="PNG or JPG, maximum 5 MB."
  onChange={setCoverFiles}
  placeholder="Upload cover image"
/>
```

`accept` only filters the native picker. Validate file type and size in the
application. Provide a descriptive `placeholder` or accessible name. Do not
assume disabled drag-and-drop blocks file processing.

## ColorPicker

Use `ColorPicker` only for a controlled decorative color choice. Provide
`value` and handle `onInput`.

```tsx
<ColorPicker
  label="Accent color"
  onInput={(event) => setAccentColor(event.currentTarget.value)}
  value={accentColor}
/>
```

Do not use ColorPicker in accessibility-critical flows. Its label and palette
buttons do not provide complete accessible naming or error-description
relationships. Do not rely on unsupported props such as `disabled`, `width`,
`defaultValue`, or native form attributes.
