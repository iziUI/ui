# Consumer AI Documentation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish a self-describing `@iziui/react` package that lets agents and developers discover and safely use its real public UI API.

**Architecture:** Keep consumer documentation beside the React package and publish it through the existing `files` allowlist. Use `AI.md` as the navigation layer, focused Markdown guides as decision-making layers, and emitted TypeScript declarations as final API detail. Correct only public API inconsistencies that directly cause invalid consumer code.

**Tech Stack:** React 19, TypeScript, Vite, vite-plugin-dts, Jest, React Testing Library, Yarn 3 workspaces, npm package files allowlist.

**Spec:** `docs/superpowers/specs/2026-10-03-consumer-ai-documentation-design.md`

## Global Constraints

- Serve consumers of installed `@iziui/react`; do not replace contributor guides in the workspace root.
- Use only documented public imports in consumer examples. Never reference package `src`, `dist`, `_internal`, repository paths, or local Storybook.
- Do not add dependencies or change package dependency boundaries.
- Preserve public behavior except direct corrections required to make a documented public contract safe and usable.
- Keep `lab` APIs explicitly experimental. Do not present them as a default solution.
- Document source behavior and generated types, not inaccurate Storybook metadata.
- Write package documentation and code comments in normal English.
- Use `make run react <script>` for package scripts. Do not commit unless the user explicitly asks.

## Review Focus

- `Button loading={true}` must render without `cloneElement` failure, suppress clicks, and not make the progress indicator duplicate the action's accessible name. Test in Task 1.
- `Grid` types must reject span `0`, because generated CSS only supplies spans `1` through `12`. Typecheck assertion in Task 1.
- Every installed documentation link must resolve without repository files. Validate in Task 5.
- Every component example must import only package public entry points and must not invent API values. Review against source barrels and typecheck in Task 5.
- Packed tarball must include the entrypoint, guides, direct accessibility guide, and `dist`. Validate with `yarn pack --dry-run` in Task 5.

## File Structure

| Path | Responsibility |
| --- | --- |
| `packages/apps/react/AI.md` | Short agent entrypoint and progressive-disclosure map. |
| `packages/apps/react/README.md` | Human installation and minimum setup entrypoint. |
| `packages/apps/react/ACCESSIBILITY.md` | Existing detailed consumer accessibility guide; publish unchanged. |
| `packages/apps/react/docs/getting-started.md` | Complete application setup, theme, styles, imports, and static tokens. |
| `packages/apps/react/docs/rules.md` | Consumer import, composition, styling, and API constraints. |
| `packages/apps/react/docs/accessibility.md` | Short navigation page to package-local accessibility responsibilities without duplicating the full guide. |
| `packages/apps/react/docs/components/*.md` | Public component inventory and category-level decision documentation. |
| `packages/apps/react/docs/design-system/*.md` | Typography, spacing, color, and layout usage guidance. |
| `packages/apps/react/docs/composition/common-patterns.md` | Public-API composition examples for common application UI. |
| `packages/apps/react/package.json` | Include consumer documentation in package publication allowlist. |
| `packages/apps/react/src/actions/Button/Button.tsx` | Make `loading={true}` use a safe default `Loading` element; expose prop JSDoc. |
| `packages/apps/react/src/actions/Button/Button.spec.tsx` | Prove boolean loading behavior. |
| `packages/apps/react/src/layout/Stack/Stack.tsx` | Add public `gap` JSDoc. |
| `packages/apps/react/src/layout/Grid/interface.ts` | Restrict public spans to 1–12 and document responsive inheritance. |
| `packages/apps/react/src/layout/index.ts` | Re-export public `GridSpan`. |
| `packages/apps/react/src/layout/Grid/Grid.spec.tsx` | Add type-level span regression assertion. |
| `packages/apps/react/src/display/Typography/Typography.tsx` | Add public `variant` JSDoc describing semantic output. |

---

### Task 1: Correct Critical Public Contracts And Declaration Guidance

**Files:**
- Modify: `packages/apps/react/src/actions/Button/Button.tsx:1-76`
- Modify: `packages/apps/react/src/actions/Button/Button.spec.tsx:67-118`
- Modify: `packages/apps/react/src/layout/Stack/Stack.tsx:12-20`
- Modify: `packages/apps/react/src/layout/Grid/interface.ts:1-20`
- Modify: `packages/apps/react/src/layout/index.ts:1-6`
- Modify: `packages/apps/react/src/layout/Grid/Grid.spec.tsx`
- Modify: `packages/apps/react/src/display/Typography/Typography.tsx:14-47`

**Interfaces:**
- Consumes: current exported `ButtonProps`, `GridProps`, `StackProps`, and `TypographyProps`.
- Produces: `ButtonProps.loading?: React.JSX.Element | boolean` that works for both public values; `Size` grid spans restricted to `1` through `12`; declaration comments emitted into built `.d.ts` files.

- [ ] **Step 1: Add failing Boolean-loading test in `Button.spec.tsx`**

Render `<Button aria-label="Save changes" loading>Save changes</Button>`. Assert the button contains the standard loading class, no visible label content, and calling `fireEvent.click` does not call `onClick`. Assert the loading element is `aria-hidden="true"` so it does not supply an unrelated accessible name.

- [ ] **Step 2: Run focused Button test to verify the current failure**

Run: `make run react test -- Button.spec.tsx`

Expected: FAIL because `cloneElement` receives `true`.

- [ ] **Step 3: Support Boolean `Button.loading` in `Button.tsx`**

Import the public local `Loading` component with `LoadingProps`. Convert `loading === true` into `<Loading aria-hidden />` before passing the element to the existing `renderLoading` helper. Keep custom `React.JSX.Element` support, replacement of children/icons, and click suppression unchanged. Do not automatically add `disabled`, `aria-busy`, or an accessible action name; documentation must state that consumer responsibility.

Add JSDoc to `ButtonProps.loading` stating that `true` renders the standard indicator, a custom `Loading` element is allowed, and busy buttons need `disabled`, `aria-busy`, and an accessible name.

- [ ] **Step 4: Make layout and typography declarations decision-complete**

In `StackProps`, add JSDoc to `gap` stating it controls direct-child spacing in CSS pixels and should replace sibling margins.

In `Grid/interface.ts`, introduce and export `GridSpan = IntRange<1, 13>`. Use `GridSpan` for every breakpoint in exported `Size`. Re-export `GridSpan` from `layout/index.ts` beside `GridBaseProps`, `GridItemBaseProps`, and `Size`. Add one JSDoc description to each breakpoint property: values are column spans `1` through `12`, and missing narrower breakpoints inherit from wider values in `GridItem`.

In `TypographyProps`, add JSDoc to `variant` stating that heading variants render matching heading elements, `body1`/`body2` render paragraphs, and both subtitle variants render `h6`; consumers must preserve heading order.

- [ ] **Step 5: Add type-level Grid span regression assertion**

In existing `Grid.spec.tsx`, add a compile-time `@ts-expect-error` JSX case with `xs={0}` and a valid render case with `xs={12}`. Keep the cases inert at runtime. This assertion must fail if `0` becomes valid again and must pass when `GridSpan` accepts only 1–12.

- [ ] **Step 6: Run focused tests and typecheck**

Run: `make run react test -- Button.spec.tsx Grid.spec.tsx`

Expected: PASS.

Run: `make run react typecheck`

Expected: PASS, including the `@ts-expect-error` check.

### Task 2: Publish Entry Points, Setup, Rules, And Accessibility Navigation

**Files:**
- Create: `packages/apps/react/AI.md`
- Modify: `packages/apps/react/README.md`
- Create: `packages/apps/react/docs/getting-started.md`
- Create: `packages/apps/react/docs/rules.md`
- Create: `packages/apps/react/docs/accessibility.md`
- Modify: `packages/apps/react/package.json:11-13`

**Interfaces:**
- Consumes: package `exports`, existing README setup requirements, `ACCESSIBILITY.md`, `createTheme`, `ThemeProvider`, `useTheme`, token Sass output, and public category barrels.
- Produces: package-local entrypoint and all documentation routes needed before a component-specific guide.

- [ ] **Step 1: Create `AI.md` as the installed-package map**

State that `@iziui/react` provides React UI components and a runtime design system. Require stylesheet import and `ThemeProvider` setup before component usage. Direct agents to `docs/components/index.md`, the four design-system guides, `docs/composition/common-patterns.md`, `docs/rules.md`, `docs/accessibility.md`, and public declaration files.

State root named imports are default. List category imports and individual default imports as secondary options. Require public entry points only. Explicitly prohibit deep imports, invented props/variants, raw hardcoded theme values when semantic APIs exist, another UI library for covered needs, and undocumented `lab` usage.

- [ ] **Step 2: Replace `README.md` with concise package-local onboarding**

Keep package name, React installation requirement, CSS import, `createTheme`, `ThemeProvider`, and a minimal named-import example. Link only to `AI.md`, `docs/getting-started.md`, the component index, design-system guides, composition guide, rules, and package-local `ACCESSIBILITY.md`. Remove workspace-relative links and detailed material duplicated by new guides.

- [ ] **Step 3: Write setup, rules, and accessibility navigation guides**

In `getting-started.md`, document CSS import once, root `ThemeProvider`, `createTheme` light/dark usage, `useTheme`, root/category/default component imports, Sass token import `@iziui/react/scss/main.scss`, and static token boundaries. State React package exposes compiled Sass tokens but does not expose JavaScript token imports; consumers needing JS token exports install and use `@iziui/tokens/web/js` separately.

In `rules.md`, define public-import policy, component-first selection, `Typography` hierarchy, semantic colors, `Stack`/`Grid` gap-first layout, custom CSS limits, no invented APIs, no second UI library for existing components, no unreviewed experimental API, and accessibility rules that apply to every example.

In `accessibility.md`, give a short purpose statement and link by package-relative path to `../../ACCESSIBILITY.md`. List when agents must read the full guide: fields, overlays, feedback, icon-only controls, headings, keyboard behavior, color-only status, and end-to-end accessibility testing. Do not duplicate component details from the full guide.

- [ ] **Step 4: Update package publication allowlist**

Change `package.json` `files` to include `dist`, `docs`, `AI.md`, `README.md`, and `ACCESSIBILITY.md`. Do not add package exports for documentation and do not add `.npmignore`.

- [ ] **Step 5: Review setup documentation against package API**

Run: `make run react typecheck`

Expected: PASS.

Manually verify every relative Markdown target from `AI.md` and `README.md` exists in `packages/apps/react`.

### Task 3: Document Component Catalogue, Actions, Display, And Layout

**Files:**
- Create: `packages/apps/react/docs/components/index.md`
- Create: `packages/apps/react/docs/components/actions.md`
- Create: `packages/apps/react/docs/components/display.md`
- Create: `packages/apps/react/docs/components/layout.md`

**Interfaces:**
- Consumes: `src/actions/index.ts`, `src/display/index.ts`, `src/layout/index.ts`, individual public component exports, prop types, source defaults, and `ACCESSIBILITY.md`.
- Produces: component lookup documentation for common application UI and layout primitives.

- [ ] **Step 1: Create component catalogue index**

List every stable public component grouped as Actions, Display, Fields, Feedback, Layout, Navigation, and Advanced. For each entry state root import, category import, individual default subpath only when `package.json` exports one, props type, and exact category-document anchor. Do not claim individual subpaths for helper components such as `TableBody`, `TableCell`, `TableHeader`, `GridItem`, `Option`, or `ModalFooter`.

Include a separate Experimental section for `@iziui/react/lab`. List its entry points but direct agents to `advanced.md` and require explicit acceptance before use.

- [ ] **Step 2: Write action component guide**

Document `Button`, `ButtonIcon`, and `Ripple`. For `Button`, document `small|medium|large`, semantic colors, `contained|outlined|text`, icon props, native button semantics, Boolean/custom-element loading, `type="button"` decision, and busy-state accessibility responsibility. For `ButtonIcon`, document numeric `size`, single `Icon` child, and accessible name requirement. Mark `Ripple` as internal visual composition only, not an independent accessible control.

- [ ] **Step 3: Write display component guide**

Document `Card`/`CardContent`, `Typography`, `Table`/`TableHeader`/`TableBody`/`TableCell`, `Avatar`, `Chip`, `Divider`, `Icon`, and `Tooltip`. Include real props/defaults and selection rules from source. State that a clickable `Card` must represent one action and cannot contain nested interactive controls. State `Table` needs `Card` wrapping for horizontal overflow. State `Tooltip` is hover-only and cannot provide required information. State `Icon` depends on consumer-provided icon font/CSS and decorative icons need ARIA treatment.

- [ ] **Step 4: Write layout component guide**

Document `Container`, `Stack`, `Grid`, `GridItem`, and `Box`. Provide import paths, real defaults, and nested examples. Explain `Stack.gap` and `Grid.gap` are direct pixel values; `Stack` controls one-dimensional groups; `Grid` distributes direct `GridItem` children; `Box` is last-choice wrapper for localized `sx`; `Container` constrains page width. Document spans 1–12 and fallback from `xl` through `xs`. Prefer explicit breakpoint spans when fallback is not intended.

- [ ] **Step 5: Validate documented examples**

Run: `make run react typecheck`

Expected: PASS.

Review every import against `packages/apps/react/package.json` `exports` and the relevant category barrel.

### Task 4: Document Fields, Feedback, Navigation, And Advanced APIs

**Files:**
- Create: `packages/apps/react/docs/components/fields.md`
- Create: `packages/apps/react/docs/components/feedback.md`
- Create: `packages/apps/react/docs/components/navigation.md`
- Create: `packages/apps/react/docs/components/advanced.md`

**Interfaces:**
- Consumes: `src/fields/index.ts`, `src/feedback/index.ts`, `src/navigation/index.ts`, `src/animations/index.ts`, `src/hooks/index.ts`, `src/lab/index.ts`, `ACCESSIBILITY.md`, and source-component behavior.
- Produces: consumer selection guidance and explicit API limitations for interaction-heavy components.

- [ ] **Step 1: Write fields guide from actual source behavior**

Document `Input`, `Textarea`, `Select`/`Option`, `Autocomplete`/`AutocompleteButton`, `Checkbox`, `CheckboxGroup`, `Switch`, `InputFile`, and `ColorPicker`. Give each its valid import route, core props, expected composition, and field-label/error responsibilities.

State `Select` uses direct `Option` children and `onValueChange`; `Autocomplete` uses `options`, `onChange`, and `renderOption`; `CheckboxGroup` requires related direct `Checkbox` children; `InputFile` requires externally managed `files`; and `ColorPicker` is controlled through its value and input callback.

Do not document unsupported Storybook props. Explicitly mark `ColorPicker` and `Switch` limitations that prevent their use in accessibility-critical flows. State custom icons within fields must be accessible controls independently.

- [ ] **Step 2: Write feedback guide**

Document `Alert`, `Loading`, `Progress`, `Skeleton`, `Modal`/`ModalFooter`/`useModal`, and `Toast`/`ToastProvider`/`useToast`. Include composition requirements: mount one `ToastProvider` near application root; use `ModalFooter` for dialog actions; make Modal/Drawer names explicit when no visible title exists.

Differentiate persistent `Alert`, transient `Toast`, indeterminate `Loading`, determinate `Progress`, and content-shaped `Skeleton`. State toast must not be sole record of critical information. Document actual alert roles and loading names.

- [ ] **Step 3: Write navigation guide**

Document `Drawer` family, `Menu`/`MenuButton`/`useMenu`, and `Tabs`/`TabButton`/`TabContent`/`useTabs`. Describe controlled open/current state, direct-child composition, focus behavior, accessible names, and keyboard support that actually exists.

Require `Drawer` accessible naming. Restrict `Menu` children to `MenuButton` elements. State Tabs use visual selection only and do not implement full ARIA tabs behavior, so consumers must not present them as a complete accessible tabs pattern without validating their application behavior.

- [ ] **Step 4: Write advanced guide**

Document `Bounce`, `Fade`, `Slide`, `Zoom`, `useResize`, `useListenerResized`, and `useAccessibleDialog` as advanced APIs. Explain animation timing units and reduced-motion limitation. Explain that `useAccessibleDialog` helps focus management only and does not create complete dialog semantics.

List every `lab` export as experimental. State forms are not default consumer guidance and their API/accessibility guarantees remain unstable.

- [ ] **Step 5: Validate API claims**

Run: `make run react typecheck`

Expected: PASS.

Compare every documented prop/default/union against source declarations. Do not use Storybook as authority when it conflicts.

### Task 5: Document Design System, Composition, And Distribution

**Files:**
- Create: `packages/apps/react/docs/design-system/typography.md`
- Create: `packages/apps/react/docs/design-system/spacing.md`
- Create: `packages/apps/react/docs/design-system/colors.md`
- Create: `packages/apps/react/docs/design-system/layout.md`
- Create: `packages/apps/react/docs/composition/common-patterns.md`
- Modify: `packages/apps/react/AI.md`
- Modify: `packages/apps/react/README.md`

**Interfaces:**
- Consumes: public `Typography`, `Stack`, `Grid`, `GridItem`, `Container`, `Box`, `Card`, fields, feedback, modal APIs, `ThemeProvider`, `createTheme`, `useTheme`, and compiled Sass token entries.
- Produces: design-system decision guides, reusable public-API examples, and final navigation links.

- [ ] **Step 1: Write typography and spacing guides**

In `typography.md`, document `h1`–`h6`, `subtitle1`, `subtitle2`, `body1`, and `body2`; their HTML output; one-`h1` rule; heading order; default text color; and composition of a page header with `Stack`. Do not recommend subtitle variants where an extra `h6` would break document structure.

In `spacing.md`, distinguish static Sass `spacing: 8px` from `theme.spacing`. State `Stack.gap` defaults to `16`, `Grid.gap` defaults to `15`, both accept direct CSS pixel numbers, and neither automatically multiplies `theme.spacing`. Give selection guidance for 8, 12, 16, 24, 32, and 40 pixel gaps as compact-to-page scale. Prefer sibling `gap`; use margins only for external separation when no layout primitive owns the relationship.

- [ ] **Step 2: Write colors and layout guides**

In `colors.md`, document semantic component colors `primary`, `secondary`, `success`, `warning`, `error`, `info`, and `grey`; palette derivatives; `text.primary`, `text.secondary`, `text.disabled`; `background.default`, `background.paper`, `background.muted`; and `divider`. Explain `createTheme` customization and shallow palette override constraint. Avoid raw hardcoded UI colors when a semantic color exists.

In `layout.md`, provide choice table and responsive page example for `Container`, `Stack`, `Grid`, `GridItem`, and `Box`. Include breakpoints `xs` ≤599, `sm` 600–899, `md` 900–1199, `lg` 1200–1535, and `xl` ≥1536. State `Grid` places layout props on direct `GridItem` children and uses `xl`-to-`xs` fallback.

- [ ] **Step 3: Write common composition patterns**

Use only public imports from `@iziui/react`. Provide complete minimal TSX examples for:

- Page header with `Stack`, `Typography`, and action `Button`.
- Form with `Stack`, `Input`, `Select`/`Option`, validation text, and submit `Button`.
- Card/list item with `Card`, `CardContent`, `Typography`, `Chip`, and non-nested actions.
- Responsive catalogue grid with `Container`, `Grid`, `GridItem`, `Card`, and explicit spans.
- Filters toolbar with `Stack`, `Select`, `CheckboxGroup`, and a `Drawer` for narrow screens.
- Empty state with `Typography` and `Button`.
- Persistent error state with `Alert` and a recovery action.
- Controlled confirmation modal with `Modal`, `ModalFooter`, and named buttons.
- Responsive page combining header, filters, and grid.

For each example, add a short “Use when” and “Avoid when” statement. Ensure the videogame catalogue scenario can select layout, typography, spacing, colors, cards, filters, and actions from this document set.

- [ ] **Step 4: Finish navigation and run link/API review**

Update `AI.md` and `README.md` if final anchors or file names require adjustments. From `packages/apps/react`, inspect each Markdown link and ensure its target exists in the package directory. Search consumer documentation for forbidden import patterns: `@iziui/react/dist`, `@iziui/react/src`, `_internal`, and workspace-relative `../../tokens` links. Resolve every match unless it is prose that explicitly prohibits the path.

- [ ] **Step 5: Build and inspect package contents**

Run: `make run react build`

Expected: PASS.

Run: `make run react typecheck`

Expected: PASS.

Run: `yarn pack --dry-run` from `packages/apps/react`.

Expected: output includes `AI.md`, `README.md`, `ACCESSIBILITY.md`, every `docs/**` file, and `dist/**`.

- [ ] **Step 6: Simulate consumer discovery**

Start at `AI.md` and follow links needed to plan a videogame catalogue page. Confirm the path identifies public components, imports, layout primitives, Typography choices, spacing values, colors, cards, filters, actions, composition examples, and prohibited practices without reading repository-only files.

## Plan Self-Review

**Spec coverage:** Tasks 2–5 cover package-local documentation, progressive disclosure, public components, design-system guides, composition, consumer rules, accessibility navigation, and package publication. Task 1 covers the only approved behavioral correction and declaration guidance. Task 5 covers package and scenario validation. No requirement lacks an owning task.

**Step scan:** Each code step names target files, required public API behavior, and validation. Documentation tasks name documents, source authorities, component groups, required decisions, and prohibited claims without duplicating final prose.

**Type consistency:** Task 1 exports `GridSpan` from `Grid/interface.ts` and re-exports it through `layout/index.ts`, so root and layout entry-point types remain discoverable. `ButtonProps.loading` retains its existing union. Documentation names only public exports from existing barrels.

**Review Focus:** Task 1 owns Boolean loading and grid span type regression. Task 5 owns installed links, public examples, and packed file coverage.

**Proportion:** Five independently reviewable tasks group tightly coupled document sets. The plan specifies contract decisions and verification rather than reproducing documentation prose.
