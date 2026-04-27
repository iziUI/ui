---
name: create-component
description: Scaffold a new component with styles, story, test, and barrel export following the project conventions
---

# Create component

## Inputs
- Component category
- Component name

## Rules
- Use typescript (*.tsx)
- Create test file using jest
- Component name must be in PascalCase
- Do not create the component if the folder already exists
- If the component already exists, report it instead of overwriting files
- Use the same relative import conventions as neighboring components in the same category
- Before generating imports, inspect an existing component from the target category and mirror its import style

## Expected output
- Generate only the base scaffold
- Do not invent variants or complex internal logic
- Use minimal valid markup
- Add `TODO` comments only where project-specific decisions are required

## Tests
- Create a basic Jest test file
- Include at least one render test
- Use the same test utilities already used in the project
- Do not invent behavior assertions that are not implemented yet

## Stories
- Create a default meta
- Create one basic example story
- Create one playground story when this is the convention in the project
- Use the same docs/parameters format as existing components

## Structure
- The component directory must be created at `src/<category>/<ComponentName>/`
- Allowed categories: `actions`, `animations`, `core`

To `Foo` component in `bar` category

src/bar/Foo/
  Foo.tsx
  Foo.stories.tsx
  Foo.spec.tsx
  index.ts

packages/styles/src/components/
  _components.scss
  Foo.scss

## Template

### Foo.scss
```scss
.#{$prefix}-foo {

}
```

### _components.scss
- Always add the new stylesheet to `packages/styles/src/components/_components.scss`
- Keep imports sorted alphabetically
- Do not duplicate an existing `@forward`

```scss
...
@forward "./Foo.scss";
...
```

### Foo.tsx

```tsx
import type { HTMLAttributes } from 'react';

import { prefix } from '@iziui/tokens/web/js';

import { joinClass } from '@iziui/core/utils';

import createComponent from '../../core/createComponent';

import '@iziui/styles/components/Foo.scss';

export interface FooProps extends HTMLAttributes<HTMLDivElement> { };

function Foo({ ...props }: FooProps) {
  const cls = joinClass(
    `${prefix}-foo`,
    props.className
  );

 return (
  <div className={cls}>
    ...
  </div>
 )
}

export default createComponent(Foo);
```

### Foo.stories.tsx

```tsx
import type { Meta, StoryObj } from '@storybook/react';

import Foo from './Foo';

export const Variant: StoryObj<typeof Foo> = {
  render: () => {
    return (
      ...
    );
  },
};

export const Playground: StoryObj<typeof Foo> = {
  tags: ['!dev'],
};

const meta: Meta<typeof Foo> = {
  title: 'bar/Foo',
  component: Foo,
  parameters: {
    layout: 'centered',
    docs: {
      ref: Playground,
      description:
        'Todo: Foo description',
      tag: (
        <Foo />
      ),
    },
  },
};

export default meta;
```

### Foo.spec.tsx

```tsx
import Foo from './Foo';

describe('Foo', () => {
 it('renders successfully', () => {
    render(<Foo />);
    expect(screen.getByRole('generic')).toBeInTheDocument();
  });
});
```

### index.ts

```ts
export { default, type FooProps } from './Foo';

```