# AGENTS.md Guidance Improvement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make repository guidance easier to recover, prioritize, and apply consistently throughout long development tasks.

**Architecture:** Keep `AGENTS.md` as a compact global contract and routing map. Keep detailed procedures in task-specific documentation and Agent Skills. Add guidance incrementally, preserving existing project behavior and user changes.

**Tech Stack:** Markdown, `AGENTS.md`, repository documentation, Agent Skills.

**Spec:** This plan records the 2026-10-01 audit of `AGENTS.md`; no separate design specification exists.

## Global Constraints

- Preserve the user's current uncommitted changes in `AGENTS.md` and `Makefile`.
- Do not change command policy unless the user explicitly reopens the deferred command-policy task.
- Do not add dependencies.
- Keep `AGENTS.md` in English because it is repository guidance for agents.
- Keep procedures in documentation and skills; keep global rules and routing in `AGENTS.md`.
- Run `git diff --check` after documentation-only changes.

## Review Focus

- An explicit task requirement must never weaken security or accessibility requirements.
- A required rule must be distinguishable from an implementation preference.
- Root guidance must not duplicate detailed task procedures maintained in skills or docs.
- Architecture rules must be based on verified package dependencies, not assumptions from a diagram.
- Any added rule must not conflict with documented public behavior, including numeric `Stack.gap` and `Grid.gap` values.

---

## Audit Baseline

### Current strengths

- The package map and responsibilities provide a useful architectural starting point.
- Existing patterns are separated into focused documents under `docs/patterns/`.
- Testing guidance names Jest, React Testing Library, and behavior-focused tests.
- RTK has a dedicated, concrete tool guide.
- Specialized skills exist for setup, component scaffolding, tests, and Storybook metadata.

### Findings and planned disposition

1. `high` - Critical global constraints were below setup and command details. Resolved by Task 1.
2. `high` - Security, accessibility, compatibility, and task requirements had no stated precedence. Resolved by Task 1.
3. `high` - Direct Yarn commands, Makefile rules, and RTK guidance conflict. Deferred by user request; do not change now.
4. `high` - Setup previously lacked a documented command. User added `make setup`; user also removed `yarn.lock` deletion from `Makefile`.
5. `high` - No end-of-task workflow or verification checkpoint exists. Planned in Task 2.
6. `medium` - Package hierarchy is descriptive but does not define allowed imports. Planned in Task 4.
7. `medium` - React-specific categories and build output occupy global guidance. Planned in Task 5.
8. `medium` - `AGENTS.md` omits links to existing accessibility guidance, package READMEs, and local skills. Planned in Task 3.
9. `medium` - Test expectations do not vary by change type. Planned in Task 6.
10. `medium` - Existing skills are not discoverable from repository guidance. Planned in Task 3.
11. `medium` - React category list and `create-component` skill accepted categories differ. Review during Task 5; do not alter either source without an explicit compatibility decision.
12. `low` - Empty `Memory` section adds no guidance. Planned in Task 8.

## File Structure

- `AGENTS.md`: global constraints, precedence, workflow, repository map, task routing, and concise links.
- `docs/architecture/package-dependencies.md`: verified dependency directions and import-boundary rules, if Task 4 confirms a separate document is needed.
- `docs/patterns/`: focused coding patterns; remain the source for detailed implementation guidance.
- `docs/tooling/rtk.md`: RTK command behavior; remain the source for detailed tool instructions.
- `packages/apps/react/ACCESSIBILITY.md`: React accessibility responsibilities and guarantees.
- `.agents/skills/`: specialized, repeatable procedures.

### Task 1: Promote Critical Rules and Define Precedence

**Status:** Complete on 2026-10-01.

**Files:**
- Modify: `AGENTS.md:5-26`

**Interfaces:**
- Produces: a mandatory `Critical Rules` section and repository-rule precedence policy.

- [x] **Step 1: Consolidate global constraints at the top of `AGENTS.md`**

Move planning, localized change, configuration, dependency, compatibility, security, and accessibility rules ahead of project overview and commands.

- [x] **Step 2: Add rule precedence**

Order task requirements, security and accessibility, public compatibility, architecture boundaries, and implementation preferences. State that a security or accessibility correction can require a breaking change and must report its public impact.

- [x] **Step 3: Verify document diff**

Run: `git diff --check`

Expected: no whitespace errors.

### Task 2: Add Required Development Workflow

**Priority:** High.

**Status:** Complete on 2026-10-01.

**Files:**
- Modify: `AGENTS.md`

**Interfaces:**
- Consumes: `Critical Rules`, `docs/patterns/`, `docs/tooling/rtk.md`, and existing test guidance.
- Produces: a short, mandatory before/during/finish checklist for all development tasks.

- [x] **Step 1: Add a concise pre-implementation checklist**

Require agents to inspect the affected implementation, search for a structurally similar solution, read applicable documentation, and identify the smallest verification command before editing.

- [x] **Step 2: Add a completion checklist**

Require the smallest relevant verification, review of public API and accessibility impact, and an explicit note when verification cannot run.

- [x] **Step 3: Keep workflow generic**

Do not restate component, test, style, or tooling procedures. Route those tasks to their own documentation and skills.

- [x] **Step 4: Verify document diff**

Run: `git diff --check`

Expected: no whitespace errors.

### Task 3: Add Documentation and Skill Routing

**Priority:** Medium.

**Status:** Complete on 2026-10-01.

**Files:**
- Modify: `AGENTS.md`

**Interfaces:**
- Consumes: `docs/patterns/`, `docs/tooling/rtk.md`, `packages/apps/react/ACCESSIBILITY.md`, package READMEs, and local skills.
- Produces: task-to-document and task-to-skill routing without duplicating procedures.

- [x] **Step 1: Add task-context documentation links**

Link control flow, formatting, component styling, RTK, React accessibility, and package public API documentation. State when each reference applies.

- [x] **Step 2: Add available skill map**

List `setup`, `create-component`, `create-tests`, and `fill-storybook-meta`. Give each skill one task trigger. Do not include full skill procedures in `AGENTS.md`.

- [x] **Step 3: Verify every referenced path exists**

Read each linked document and skill. Remove or correct any stale path before completing the task.

- [x] **Step 4: Verify document diff**

Run: `git diff --check`

Expected: no whitespace errors.

### Task 4: Define Verified Package Dependency Boundaries

**Priority:** Medium.

**Status:** Complete on 2026-10-01.

**Files:**
- Modify: `AGENTS.md`
- Create if needed: `docs/architecture/package-dependencies.md`

**Interfaces:**
- Consumes: workspace manifests, package exports, and actual source import relationships.
- Produces: explicit allowed dependency directions and prohibited layer inversions.

- [x] **Step 1: Inspect package manifests, exports, and cross-package imports**

Derive dependency directions from repository evidence. Do not treat the current ASCII diagram as sufficient proof.

- [x] **Step 2: Document verified import boundaries**

State which package layers may import each other and whether consumers must use public exports. Add examples only when a rule would otherwise remain ambiguous.

- [x] **Step 3: Link concise root rule to detailed boundary document**

Keep dependency summary in `AGENTS.md`. Put matrix and detailed examples in `docs/architecture/package-dependencies.md` only if detail exceeds a compact root section.

- [x] **Step 4: Verify document diff and references**

Run: `git diff --check`

Expected: no whitespace errors and all internal Markdown paths resolve.

### Task 5: Separate Global and React-Specific Context

**Priority:** Medium.

**Status:** Complete on 2026-10-01.

**Files:**
- Modify: `AGENTS.md`
- Review: `.agents/skills/create-component/SKILL.md`

**Interfaces:**
- Consumes: agent-harness instruction-discovery behavior, React package documentation, and component categories.
- Produces: global guidance without unrelated React detail and root-level task routing.

- [x] **Step 1: Record the root-only routing decision**

Nested `AGENTS.md` discovery remains unverified. Do not create a package-local instruction file; retain root routing links instead.

- [x] **Step 2: Remove React-specific details from root guidance**

Remove component categories and Vite build-output details. Keep the root package map concise and route React work to existing package documentation.

- [x] **Step 3: Defer the category mismatch without changing the skill**

The `create-component` skill does not accept all React source categories. Preserve the skill and omit the root category list until a user-approved compatibility decision resolves this mismatch.

- [x] **Step 4: Verify root task routing**

Read every retained task reference and run `git diff --check`.

Expected: no whitespace errors; every root task reference has a reachable source.

### Task 6: Define Verification by Change Type

**Priority:** Medium.

**Files:**
- Modify: `AGENTS.md`
- Modify if needed: task-specific testing documentation

**Interfaces:**
- Consumes: existing package scripts and test tooling.
- Produces: a small verification matrix for component, style, token, public API, and documentation changes.

- [ ] **Step 1: Inventory available package validation scripts**

Confirm test, lint, typecheck, build, and Storybook scripts before documenting commands. This task does not redefine command policy.

- [ ] **Step 2: Define smallest relevant verification for each change class**

Specify expected checks for component behavior, styles, tokens, public exports, and documentation links. Avoid requiring full monorepo validation for every documentation edit.

- [ ] **Step 3: Link matrix from development workflow**

Keep workflow short. Put detailed command choices in the matrix or existing tooling documentation.

- [ ] **Step 4: Verify document diff and command accuracy**

Run documented commands only after confirming their package scripts exist. Run `git diff --check` for documentation formatting.

### Task 7: Make Supported Negative Rules Explicit

**Priority:** Medium.

**Status:** Complete on 2026-10-01.

**Files:**
- Modify: `AGENTS.md`

**Interfaces:**
- Consumes: verified package boundaries, public API documentation, and component styling pattern.
- Produces: concise prohibitions that prevent common inconsistent changes.

- [x] **Step 1: Add only evidence-backed negative rules**

Candidates: do not modify unrelated files; do not create utilities before searching existing ones; do not invert package dependencies; do not bypass public exports; do not use `style` or CSS custom properties when `sx` supports the required theme value.

- [x] **Step 2: Reject incompatible blanket rules**

Do not prohibit all numeric spacing values. Public React documentation supports numeric `Stack.gap` and `Grid.gap` values.

- [x] **Step 3: Verify source documentation supports every prohibition**

Read each supporting document before adding its root-level rule.

- [x] **Step 4: Verify document diff**

Run: `git diff --check`

Expected: no whitespace errors.

### Task 8: Remove Incomplete or Empty Guidance

**Priority:** Low.

**Files:**
- Modify: `AGENTS.md`

**Interfaces:**
- Consumes: completed task routing and workflow sections.
- Produces: no empty sections, placeholders, or duplicate global rules.

- [ ] **Step 1: Review remaining top-level sections**

Remove `Memory` if it still has no defined purpose. Remove duplicate rules replaced by Critical Rules and task routing.

- [ ] **Step 2: Verify heading scan and document diff**

Read the complete `AGENTS.md` from top to bottom. Confirm every heading has a purpose and `git diff --check` reports no whitespace errors.

## Deferred Work

### Command Policy Unification

The audit found competing guidance for direct Yarn commands, Makefile commands, and RTK. The user explicitly deferred this work on 2026-10-01. Do not change command policy, setup commands, or command examples until the user reopens this task.

## Plan Self-Review

Spec coverage: This plan retains all audit findings, including resolved critical rules, deferred command policy, workflow, architecture, context ownership, documentation routing, skill discoverability, verification, negative rules, and cleanup.

Step scan: Each pending task names exact files, source information, decision boundaries, and a verification result. Documentation-only tasks use `git diff --check`; command execution is limited to later tasks that first verify scripts exist.

Type consistency: No code interfaces are introduced. All named documentation paths and skills existed when this plan was written.

Review focus: Each high-risk audit category has a task or explicit deferred status.

Proportion: This plan records decisions and task boundaries without reproducing existing documentation or skill procedures.
