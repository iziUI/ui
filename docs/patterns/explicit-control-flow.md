# Explicit Control Flow

## Rule

- Use an explicit `if` before calling an optional callback.
- Destructure props that need conditional defaults or overrides.
- Calculate conditional JSX values before the `return` statement.
- Use `useMemo` to group related derived props when it makes the render template clearer.
- Include every value read by a `useMemo` callback in its dependency list.

## Optional Callbacks

```ts
const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
  if (onKeyDown) { onKeyDown(event); }
};
```

## JSX Values

```tsx
const [resolvedRole, resolvedTabIndex] = useMemo(() => {
  if (!clickable) { return [role, tabIndex]; }

  return ['button', tabIndex ?? 0];
}, [clickable, role, tabIndex]);

return <div role={resolvedRole} tabIndex={resolvedTabIndex} />;
```

## Avoid

- Do not call an optional callback with optional chaining.
- Do not use ternaries or fallback expressions directly in JSX props.
- Do not omit values read by `useMemo` from its dependency list.
- Do not use `useMemo` to try to prevent component renders. It caches a value only.
