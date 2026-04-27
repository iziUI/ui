# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**iziUI** is a Yarn 3 monorepo for a React component library with a layered architecture: design tokens → core utilities → React components.

--- 

## How to work on this project

- Before changing code, understand the flow and propose a short plan.
- Prefer small, localized changes.
- Do not change configuration files unnecessarily.
- Do not add new dependencies without justification.

--- 
## Setup

For more information, check .claude/skills/setup/SKILL.MD

### NPM_TOKEN

If any command fails due to a missing or invalid `NPM_TOKEN`, ask the user to add the token to the project `.env` file so Claude can read it from there.

Expected format:

```bash
NPM_TOKEN=<your-token-here>

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
make run <package> <command>      # e.g. make run @iziui/react build
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

## Important Notes

- This is a **component library** - follow security best practices and accessibility
- This is a **production betting platform** - follow security best practices
- All changes must maintain **backward compatibility** unless explicitly specified
- Follow **accessibility guidelines** (WCAG compliance)

---

## Architecture

The packages form a strict dependency hierarchy:

```
@iziui/tokens          ← Design tokens (Style Dictionary → SCSS + JS)
    ↑         ↑
@iziui/core  @iziui/toolkit    ← Foundation (themes, plugins, color utils) + Utilities (string, mask, validators)
    ↑
@iziui/styles          ← SCSS-only, no build step
    ↑
@iziui/react           ← React 19 component library (Vite build, Storybook)
```

### Package responsibilities

| Package | Location | Purpose |
|---|---|---|
| `@iziui/tokens` | `packages/tokens/` | Style Dictionary tokens; exports `web/js` and `web/scss/main.scss` |
| `@iziui/toolkit` | `packages/toolkit/` | Framework-agnostic utilities: string, mask, promise, validators, logger, interface types |
| `@iziui/core` | `packages/core/` | Theme system (`createTheme`, `applyTheme`), plugin system (color, shape, spacing), color utilities |
| `@iziui/styles` | `packages/styles/` | SCSS files for base reset + per-component styles; consumed as raw SCSS |
| `@iziui/react` | `packages/apps/react/` | The component library; built with Vite (`preserveModules`), documented with Storybook 8 |

### @iziui/react component categories
- **Actions**: Button, ButtonIcon, Ripple
- **Layout**: Box, Grid, Stack
- **Display**: Avatar, Card, Chip, Divider, Icon, Typography
- **Feedback**: Alert, Loading
- **Fields**: Input
- **Navigation**: Drawer
- **Animations**: Bounce, Fade, Slide
- **Lab** (experimental): Form
- **Core**: `createComponent` factory
- **Theme**: `createTheme`, `ThemeProvider`, `useTheme`

### Build output (@iziui/react)
Vite builds with `preserveModules` — the output mirrors source structure. Outputs: ESM (`.js`), CJS (`.cjs`), TypeScript definitions (`.d.ts`), and a single bundled `dist/style.css`.

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

---

## Memory