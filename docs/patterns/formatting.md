# Formatting

## Rule

- Indent multiline call arguments one level from the call expression.
- Align the closing parenthesis with the call expression.
- Let ESLint enforce indentation instead of relying on manual review.

```ts
function getCardClassName() {
  return joinClass(
    `${prefix}-card`,
    clickable && `${prefix}-card--clickable`,
    props.className
  );
}
```

## ESLint

`eslint.config.mjs` configures `indent` with `CallExpression.arguments: 1`.
