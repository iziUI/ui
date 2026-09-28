---
name: setup
description: Instructions for setting up and running the project locally
---

# Setup

## Rules

- Always use the `Makefile` to install dependencies.
- Always use the `Makefile` to run commands from each project's `package.json`.
- Do not run `yarn`, `npm`, or project scripts directly unless explicitly requested.

## Environment variables

Before installing dependencies, check if the `.env` file exists and contains the `NPM_TOKEN`.

The `.env` file must include:

```env
NPM_TOKEN=your_token_here
```

If the NPM_TOKEN is missing or empty, ask the user to fill it before continuing.

This token is required for make install to work correctly.

## Setup

To setup the project, run:

```bash
make setup
```

## Install dependencies

To only install the project dependencies, run:

```bash
make install
```

## Running commands inside projects

The `Makefile` has a command called `run`.

Use it to execute commands inside each project in the monorepo.

The format is:

```bash
make run <project> <command>
```

Where:

- <project> is the project/package name.
- <command> is the script from that project's package.json.

### Examples

To run Storybook inside the `react` project:

```bash
make run react storybook
```

This means:

- make run is the default command.
- react is the target project.
- storybook is the package.json script to execute.