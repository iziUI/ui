---
name: create-tests
description: Create or update tests for React components in this monorepo. Use when the user asks to add tests, improve tests, fix failing tests, or create coverage for a component.
---

# Create tests

## Goal

Create tests following this project's conventions.

## Rules

- Use Jest.
- Use React Testing Library for React components.
- Test behavior, not implementation details.
- Avoid testing CSS class names unless the class is part of the public behavior.
- Prefer accessible queries: `getByRole`, `getByLabelText`, `getByText`.
- Use `userEvent` for user interactions.
- Create the test beside the component using `ComponentName.spec.tsx`.

## File structure

For a component:

```txt
src/<category>/<ComponentName>/
  ComponentName.tsx
  ComponentName.spec.tsx
  index.ts
```