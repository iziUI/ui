---
name: fill-storybook-meta
description: Fill in the meta of a Storybook stories file — description, args, and argTypes — based on the component's TypeScript interface.
---

# Fill Storybook Meta

## Goal

Complete the `meta` object in a `*.stories.tsx` file with accurate `description`, `args`, and `argTypes`, based on the component's TypeScript props interface and existing stories.

## Inputs

- **Component name** passed as the skill argument (e.g. `Button`, `Avatar`, `Skeleton`).
  - Locate the stories file by searching `packages/apps/react/src/**/<ComponentName>.stories.tsx`.
  - The component source file is inferred from the same directory (e.g. `<ComponentName>.tsx`).
  - If more than one match is found, ask the user which one to use before proceeding.
  - If no match is found, stop and ask the user for the full path.

## Steps

1. Resolve the stories file path from the component name (see **Inputs** above).
2. Read the stories file to understand what is already defined.
3. Read the component source file to extract the props interface.
4. For each prop, determine:
   - Its TypeScript type (union, boolean, string, ReactElement, etc.)
   - Whether it has a default value in the component function signature
   - Whether it accepts a finite set of options (union literal type → use `select` control)
5. Fill in the three sections below inside the existing `meta` object.

## Rules

- Write descriptions in **pt-BR**.
- Never overwrite stories (`export const ...`) — only modify the `meta` object.
- Do not invent props that do not exist in the interface.
- Do not add `argTypes` entries for props inherited from HTML elements (`HTMLAttributes`, `ButtonHTMLAttributes`, etc.) unless they are explicitly redeclared in the component interface or already used in existing stories.
- If an `args` or `argTypes` section already exists and is partially filled, **merge** — do not replace.
- Keep existing `parameters` untouched (layout, docs.ref, docs.tag, etc.).

## `description`

Fill `parameters.docs.description` with one short sentence in pt-BR describing what the component does and when to use it.

Example:
```ts
parameters: {
  docs: {
    description: 'Buttons permitem que os usuários realizem ações, confirmem escolhas e iniciem fluxos dentro da interface.',
  },
},
```

## `args`

Provide sensible default values used by the **Playground** story controls. Use the component's own default parameter values as a guide.

Rules:
- Include only props that make sense as interactive controls (exclude `ReactElement` props like `startIcon`, `endIcon`, `loading` — set those to `undefined` or omit them).
- Always include `children` with a representative text value when the component accepts children.

Example:
```ts
args: {
  children: 'Some text here',
  size: 'medium',
  color: 'primary',
  variant: 'contained',
  disabled: false,
},
```

## `argTypes`

For each prop in the component interface, add an entry with the shape below. Adjust `control` and `options` based on the TypeScript type:

| TS type                    | `control`  | `options`           |
|----------------------------|------------|---------------------|
| `'a' \| 'b' \| 'c'`       | `'select'` | `['a', 'b', 'c']`   |
| `boolean`                  | `'boolean'`| —                   |
| `string`                   | `'text'`   | —                   |
| `number`                   | `'number'` | —                   |
| `ReactElement \| boolean`  | `false`    | —                   |
| `ReactElement`             | `false`    | —                   |

Full shape:
```ts
argTypes: {
  propName: {
    control: 'select',           // or 'boolean', 'text', 'number', false
    type: 'string',              // JS primitive: 'string' | 'boolean' | 'number' | 'symbol'
    options: ['a', 'b', 'c'],    // only for select controls
    description: 'Descrição em pt-BR.',
    table: {
      type: { summary: 'a | b | c' },         // TypeScript type as string
      defaultValue: { summary: 'defaultVal' }, // omit if no default
    },
  },
},
```

## Reference — Button meta (complete example)

```ts
const meta: Meta<typeof Button> = {
  title: 'actions/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      ref: Playground,
      description:
        'Buttons permitem que os usuários realizem ações, confirmem escolhas e iniciem fluxos dentro da interface.',
      tag: (
        <Chip
          label="Actions"
          icon={<Icon name="crosshair-alt" />}
          color="error"
        />
      ),
    },
  },
  args: {
    children: 'Some text here',
    size: 'medium',
    color: 'primary',
    variant: 'contained',
    disabled: false,
  },
  argTypes: {
    size: {
      control: 'select',
      type: 'string',
      options: ['small', 'medium', 'large'],
      description: 'Tamanho do componente',
      table: {
        type: { summary: 'small | medium | large' },
        defaultValue: { summary: 'medium' },
      },
    },
    disabled: {
      control: 'boolean',
      type: 'boolean',
      description: 'Se `true`, o componente está desativado.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    color: {
      control: 'select',
      type: 'string',
      options: colors,
      description: 'A cor do componente. Suporta cores de tema padrão e personalizadas.',
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
    variant: {
      control: 'select',
      type: 'string',
      options: ['contained', 'outlined', 'text'],
      description: 'A variante a ser usada.',
      table: {
        type: { summary: 'contained | outlined | text' },
        defaultValue: { summary: 'contained' },
      },
    },
    startIcon: {
      control: false,
      type: 'symbol',
      description: 'Elemento colocado antes do children.',
      table: {
        type: { summary: 'ReactElement' },
      },
    },
    endIcon: {
      control: false,
      type: 'symbol',
      description: 'Elemento colocado depois do children.',
      table: {
        type: { summary: 'ReactElement' },
      },
    },
    loading: {
      control: false,
      description: 'Se verdadeiro, o indicador de carregamento fica visível e o botão fica desativado.',
      table: {
        type: { summary: 'boolean | ReactElement' },
        defaultValue: { summary: 'false' },
      },
    },
    children: {
      control: 'text',
      type: 'symbol',
      description: 'Conteúdo do componente',
    },
  },
};
```

## Output

Edit the stories file in-place. Only touch the `meta` object — do not reorder exports, add imports, or modify story bodies.
After editing, confirm which fields were added or updated.
