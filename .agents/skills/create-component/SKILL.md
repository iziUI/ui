---
name: create-component
description: Scaffold a new component with styles, story, test, and barrel export following the project conventions
---

# Create component

## Purpose

Create only the base scaffold for a new component following the existing project conventions.

Do not add business logic, variants, complex behavior, or speculative APIs.

## Input contract

This skill requires exactly two inputs:

1. `category`
2. `componentName`

The values explicitly provided by the caller are authoritative.

Never infer `category` or `componentName` from:

- examples in this skill
- template placeholders
- file paths
- neighboring components
- existing text in this document

If either input is missing, stop and report that both values are required.

## Input normalization

### Category

The category must be one of:

- `actions`
- `animations`
- `core`
- `display`
- `feedback`
- `fields`
- `navigation`

Do not normalize or guess invalid categories.

If the category is invalid, stop and report the allowed values.

### Component name

Normalize the provided component name to PascalCase before creating files.

Examples:

- `progress` -> `Progress`
- `progress-bar` -> `ProgressBar`
- `progressBar` -> `ProgressBar`
- `loading_overlay` -> `LoadingOverlay`

Use the normalized PascalCase value as `<ComponentName>` throughout this skill.

## Naming

The following placeholders are used throughout this document:

- `<category>`: the validated component category
- `<ComponentName>`: the component name normalized to PascalCase
- `<component-name>`: the component name converted to kebab-case

Examples:

- `Progress` -> `progress`
- `ProgressBar` -> `progress-bar`
- `LoadingOverlay` -> `loading-overlay`

Never treat placeholder values or examples as actual caller inputs.

## Preconditions

Before creating files:

1. Validate the category.
2. Normalize the component name.
3. Check whether `src/<category>/<ComponentName>/` already exists.
4. If the folder already exists, stop.
5. Report that the component already exists.
6. Do not overwrite or modify the existing component.

Also inspect at least one existing component from the target category before generating files.

Use that neighboring component to determine:

- relative import conventions
- test utilities
- Storybook conventions
- formatting
- docs parameters
- barrel export style
- component factory usage
- local code style

Prefer the closest structurally similar component.

Do not copy its business logic or API.

## Rules

- Use TypeScript.
- Component files must use `.tsx`.
- Test files must use Jest.
- Component names must use PascalCase.
- Do not overwrite existing components.
- Do not create logical or business components.
- Generate only the basic component structure.
- Do not invent props unless they are required by the base HTML element.
- Do not invent variants.
- Do not invent behavior.
- Do not add dependencies.
- Use the same relative import conventions as neighboring components.
- Before generating imports, inspect an existing component from the target category and mirror its import style.
- Prefer existing project utilities instead of creating new helpers.
- Add `TODO` comments only where a project-specific decision is actually required.

## Expected structure

For a component in category `feedback` with component name `Progress`, generate:

```text
src/feedback/Progress/
  Progress.tsx
  Progress.stories.tsx
  Progress.spec.tsx
  index.ts

packages/styles/src/components/
  _components.scss
  Progress.scss
```

General structure:

```text
src/<category>/<ComponentName>/
  <ComponentName>.tsx
  <ComponentName>.stories.tsx
  <ComponentName>.spec.tsx
  index.ts

packages/styles/src/components/
  _components.scss
  <ComponentName>.scss
```

## Expected output

Generate only the base scaffold.

The resulting component should:

- compile
- render valid minimal markup
- expose its props type
- include its stylesheet
- include a basic Storybook story
- include a basic Jest render test
- be exported through its local barrel file

Do not add implementation details that were not requested.

# Templates

The templates below are structural references.

Replace all placeholders using the actual caller inputs.

Do not use placeholder names literally in generated files.

## Stylesheet

Create:

`packages/styles/src/components/<ComponentName>.scss`

Template:

```scss
.#{$prefix}-<component-name> {

}
```

For example, `ProgressBar` must generate:

```scss
.#{$prefix}-progress-bar {

}
```

Follow the formatting conventions used by neighboring stylesheets.

## Styles barrel

Update:

`packages/styles/src/components/_components.scss`

Add:

```scss
@forward "./<ComponentName>.scss";
```

Rules:

- Keep all `@forward` entries sorted alphabetically.
- Do not duplicate an existing `@forward`.
- Preserve the formatting already used in the file.
- Do not modify unrelated entries.

## Component

Create:

`src/<category>/<ComponentName>/<ComponentName>.tsx`

Base template:

```tsx
import type { HTMLAttributes } from 'react';

import { prefix } from '@iziui/tokens/web/js';

import { joinClass } from '@iziui/core/utils';

import createComponent from '../../core/createComponent';

import '@iziui/styles/components/<ComponentName>.scss';

export interface <ComponentName>Props
  extends HTMLAttributes<HTMLDivElement> {}

function <ComponentName>({ ...props }: <ComponentName>Props) {
  const cls = joinClass(
    `${prefix}-<component-name>`,
    props.className,
  );

  return (
    <div
      {...props}
      className={cls}
    />
  );
}

export default createComponent(<ComponentName>);
```

This template is only a baseline.

Before generating the final file:

- inspect an existing component from the target category
- mirror its import ordering
- mirror its formatting
- mirror its `createComponent` usage
- mirror its props conventions

Do not introduce additional props or behavior.

## Stories

Create:

`src/<category>/<ComponentName>/<ComponentName>.stories.tsx`

Use the Storybook conventions from neighboring components.

Base template:

```tsx
import type { Meta, StoryObj } from '@storybook/react';

import <ComponentName> from './<ComponentName>';

export const Variant: StoryObj<typeof <ComponentName>> = {
  render: () => {
    return (
      <<ComponentName> />
    );
  },
};

export const Playground: StoryObj<typeof <ComponentName>> = {
  tags: ['!dev'],
};

const meta: Meta<typeof <ComponentName>> = {
  title: '<category>/<ComponentName>',
  component: <ComponentName>,
  parameters: {
    layout: 'centered',
    docs: {
      ref: Playground,
      description: 'TODO: <ComponentName> description',
      tag: (
        <<ComponentName> />
      ),
    },
  },
};

export default meta;
```

Rules:

- Create a default `meta`.
- Create one basic example story.
- Create a `Playground` story only when this is already the project convention.
- Use the same `parameters`, `docs`, tags, and story naming conventions as neighboring components.
- Do not invent meaningful variants.
- Do not add controls for props that do not exist.

## Tests

Create:

`src/<category>/<ComponentName>/<ComponentName>.spec.tsx`

Use the same testing utilities and setup already used by neighboring components.

Base template:

```tsx
import <ComponentName> from './<ComponentName>';

describe('<ComponentName>', () => {
  it('renders successfully', () => {
    render(<<ComponentName> />);

    expect(
      screen.getByRole('generic'),
    ).toBeInTheDocument();
  });
});
```

Rules:

- Include at least one render test.
- Use Jest.
- Use the same rendering utilities already used by the project.
- Inspect neighboring tests before adding imports.
- Do not invent behavior assertions.
- Do not test props or interactions that are not implemented.
- Prefer the testing style already established in the target category.

## Barrel export

Create:

`src/<category>/<ComponentName>/index.ts`

Template:

```ts
export {
  default,
  type <ComponentName>Props,
} from './<ComponentName>';
```

Mirror the export formatting used by neighboring components.

## Final verification

After generating the scaffold, verify:

- the category is valid
- the component name is PascalCase
- the folder did not previously exist
- all expected files were created
- stylesheet naming matches the component
- CSS class uses kebab-case
- `_components.scss` contains exactly one new `@forward`
- `@forward` entries remain alphabetically sorted
- imports follow project conventions
- the test uses existing project test utilities
- stories follow neighboring Storybook conventions
- no unnecessary logic or variants were added

If the project provides relevant lint, test, typecheck, or formatting commands, run the smallest appropriate verification command for the generated scaffold.

Do not modify unrelated files.