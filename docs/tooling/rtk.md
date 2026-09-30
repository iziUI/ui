# Token Optimization Rules (RTK)

This project uses **RTK (Rust Token Killer)** to optimize CLI outputs and prevent LLM context bloating. You MUST prioritize token-optimized tools.

## Core Rules
- Prepend `rtk` to heavy terminal commands to strip boilerplate, progress bars, and successful compilation noise.
- Fall back to native commands ONLY if an operation is completely unsupported.

## Mapped Tooling Matrix

| Native Command | RTK Optimized Equivalent | Purpose |
| :--- | :--- | :--- |
| `git status` / `log` | `rtk git status --short` / `rtk git log --oneline` | Compact repository diffs |
| `yarn <command>` | `rtk yarn <command>` | Strips Yarn 3 project resolution & step logs |
| `yarn test` / `jest` | `rtk jest` or `rtk test` | Shows ONLY failed specs and summary lines |
| `storybook` | `rtk err yarn workspace ... storybook` | Hides successful Webpack/Vite compilation logs |
| `ls` / `tree` | `rtk ls` / `rtk tree` | Token-economical directory indexing |

## Specialized Agent Execution Patterns

### Yarn 3 Monorepo Management
Yarn 3 prints repetitive step resolutions (`➤ YN0000: Fetch step`, `➤ YN0002: Link step`). 
- **Rule:** Always wrap workspace tasks.
- **Example:** `rtk yarn workspace @iziui/react build`

### Test Suites (Jest & React Testing Library)
Standard Jest runs output dozens of lines for passing tests.
- **Rule:** Use `rtk jest` or isolate failures using the error lens.
- **Example:** `rtk test` (runs the environment runner filtering out everything except errors/warnings).

### Storybook & Compilation Noise
Storybook and Vite dev servers flood the terminal with dependency chunks and active progress percentages.
- **Rule:** When spinning up local development or checking compilation, pipes or error triggers must filter it.
- **Example:** `rtk err yarn workspace @iziui/react typecheck`