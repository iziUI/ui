# Explicit Control Flow

## Rule

- Use an explicit `if` before calling an optional callback.
- Destructure props that need conditional defaults or overrides. Keep hyphenated HTML attributes on `props` and access them with bracket notation.
- Calculate conditional JSX values before the `return` statement.
- Use `useMemo` to group related derived props when it makes the render template clearer.
- Resolve related conditional JSX attributes in one `useMemo`; keep their conditional `if` statements out of the component body.
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

```tsx
const ariaLabel = props['aria-label'];
const ariaLabelledBy = props['aria-labelledby'];
const [resolvedAriaLabel, resolvedAriaLabelledBy] = useMemo(() => {
  if (!title || ariaLabelledBy) { return [ariaLabel, ariaLabelledBy]; }

  return [ariaLabel, titleId];
}, [ariaLabel, ariaLabelledBy, title, titleId]);
```

## Avoid

- Do not call an optional callback with optional chaining.
- Do not use ternaries or fallback expressions directly in JSX props.
- Do not omit values read by `useMemo` from its dependency list.
- Do not use `useMemo` to try to prevent component renders. It caches a value only.
