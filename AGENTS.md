# AGENTS.md

This file provides guidance to agent when working with code in this repository.

## Critical Rules

Treat these rules as mandatory unless the rule precedence below permits an exception.

- Prefer the smallest localized change that satisfies the task.
- Change configuration files only when required by the task.
- Add a dependency only when existing project functionality cannot satisfy the task. State the reason.
- Preserve public API and behavior unless an explicit task requirement authorizes a breaking change.
- Treat components as production code for a component librarytt. Maintain security and WCAG accessibility requirements for every change.

## Rule Precedence

Within repository instructions, apply rules in this order:

1. Explicit task requirements, unless they weaken security or accessibility.
2. Security and accessibility requirements.
3. Public API and behavior compatibility.
4. Architecture and package dependency boundaries.
5. Implementation preferences, including localized changes, configuration changes, and dependencies.

When a security or accessibility correction requires a breaking change, make the correction and report the public impact.

## Development Workflow

Before implementation:

1. Inspect the affected flow and a structurally similar implementation.
2. Read the documentation and skill that apply to the task.
3. Propose the smallest change and identify the relevant verification.

During implementation:

1. Reuse existing project abstractions before adding new code.
2. Keep changes within the agreed scope. Re-read applicable references when the scope changes.

Before finishing:

1. Run the smallest relevant verification.
2. Check public API, accessibility, and package-boundary impact.
3. Report verification that could not run and why.

## Project Overview

**iziUI** is a Yarn 3 monorepo for a React component library with a layered architecture: design tokens → core utilities → React components.

--- 
## Setup

```bash
make setup      # Clean install all dependenciess
```

## Commands

### Root-level (runs across all workspaces)
```bash
yarn lint       # ESLint in all packages (foreach -ptv)
yarn build      # Build all packages
yarn test       # Run Jest in all packages
```

### Makefile shortcuts
```bash
make setup                        # Clean install all dependencies
make clean-modules                # Delete all node_modules and lock files
make run <package> <command>      # e.g. make run react build
```

### Package-specific (cd into the package first, or use `yarn workspace`)
```bash
yarn workspace @iziui/react storybook        # Storybook dev server (port 6006)
yarn workspace @iziui/react build-storybook  # Build static Storybook
yarn workspace @iziui/react typecheck        # TypeScript type checking
yarn workspace @iziui/react test:coverage    # Jest with coverage
yarn workspace @iziui/tokens build           # Compile Style Dictionary + TypeScript
```

---

## Architecture

The verified package dependency boundaries are:

- `@iziui/toolkit` has no iziUI package dependencies.
- `@iziui/tokens` depends on `@iziui/toolkit`.
- `@iziui/core` depends on `@iziui/tokens` and `@iziui/toolkit`.
- `@iziui/styles` has no direct iziUI package dependencies.
- `@iziui/react` depends on `@iziui/tokens`, `@iziui/toolkit`, `@iziui/core`, and `@iziui/styles`.

Read [package dependency boundaries](docs/architecture/package-dependencies.md) before adding a cross-package import.

### Package responsibilities

| Package | Location | Purpose |
|---|---|---|
| `@iziui/tokens` | `packages/tokens/` | Style Dictionary tokens; exports `web/js` and `web/scss/main.scss` |
| `@iziui/toolkit` | `packages/toolkit/` | Framework-agnostic utilities: string, mask, promise, validators, logger, interface types |
| `@iziui/core` | `packages/core/` | Theme system (`createTheme`, `applyTheme`), plugin system (color, shape, spacing), color utilities |
| `@iziui/styles` | `packages/styles/` | SCSS files for base reset + per-component styles; consumed as raw SCSS |
| `@iziui/react` | `packages/apps/react/` | React component library |

--- 

## Key Conventions

### ESLint (flat config, `eslint.config.mjs`)
- 2-space indentation, single quotes, 120-char line limit
- Import order enforced; `@iziui/*` packages are their own import group

### TypeScript
- Strict mode, target ESNext, module ESNext
- Absolute imports via `baseUrl` path mapping

### Storybook
- Config in `packages/apps/react/.storybook/`
- Stories live alongside source: `src/**/*.stories.@(js|jsx|ts|tsx)`
- SCSS preprocessor pre-imports tokens (`@iziui/tokens/web/scss/main.scss`)
- Custom theme in `.storybook/iziUITheme.ts`

### Tests

- Always use Makefile to run install and package scripts.
- Use `make run <project> <command>` to run workspace commands or open project to use `yarn test`.
- Tests use Jest and React Testing Library.
- Prefer testing behavior over implementation details.

## Task References

- Control flow: `docs/patterns/early-return.md` and `docs/patterns/explicit-control-flow.md`.
- Formatting: `docs/patterns/formatting.md`.
- React component styling: `docs/patterns/component-styling.md`.
- Token changes: `packages/tokens/README.md`.
- Core theme, `sx`, and utility changes: `packages/core/README.md`.
- React component, Storybook, or public API changes: `packages/apps/react/README.md`.
- React accessibility changes: `packages/apps/react/ACCESSIBILITY.md`.

## Available Skills

- `setup`: install dependencies or run package scripts.
- `create-component`: scaffold a React component.
- `create-tests`: add, update, or fix React component tests.
- `fill-storybook-meta`: complete Storybook metadata from component props.

## Prohibited Changes

- Do not modify unrelated files.
- Do not create a utility before searching existing utilities and component helpers.
- Do not invert package dependencies documented in `docs/architecture/package-dependencies.md`.
- Do not import package `src`, `dist`, `_internal`, or repository paths. Use documented package export entry points.
- Do not use `style` or CSS custom properties when `sx` supports the required theme value.

## Tooling

- Use RTK for supported terminal commands to reduce token usage.
- Follow the instructions in `docs/tooling/rtk.md`.
- Fall back to native commands when RTK does not support an operation.

---

## Memory
