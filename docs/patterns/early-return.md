# Early Return

## Rule

- Use an early return to stop a function when no work can be done or no further action is required.
- Place the guard before the main logic.
- Use the project format: `if (condition) { return; }`.
- Leave a blank line between the guard and the remaining logic.

```ts
const closeMenu = () => {
  if (!open) { return; }

  toggle();
};
```

## Conditions

- Combine conditions with `||` when they have the same outcome.
- Return the required value when the function does not return `void`.

```ts
const setRef = (ref: HTMLDivElement | null) => {
  if (!scrollRef.current || !ref) { return; }

  scrollRef.current.push(ref);
};

const getOptions = () => {
  if (onSearch || !filterOptions) { return options; }

  return options.filter((option) => filterOptions(option, term));
};
```

## Avoid

- Do not add an `else` after an early return.
- Do not use an early return when it makes a simple value expression less clear.
