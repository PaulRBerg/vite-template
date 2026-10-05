# Vite development guidance

References: [project overview](./README.md), [dependencies and scripts](./package.json), [task recipes](./justfile), and
[Vite configuration](./vite.config.ts).

## Source conventions

- Use `kebab-case` directories and source files, including components and hooks.
- Keep explicit `.js` extensions on local TypeScript imports; the Bundler resolver maps them to source modules.
- Prefer `type` to `interface`, `unknown` to `any`, `satisfies` for constrained constants, and named exports unless a
  framework entry point requires a default export.
- Treat `null` as known-empty in UI/domain state; use omitted or `undefined` fields at serialization boundaries.

## Vite and React

- `src/` is browser code. Do not import Node-only modules, secrets, filesystem access, or server-only Effect services
  into its module graph. Vite-exposed compile-time values must use the `VITE_` prefix; this template has no runtime
  environment contract.
- React 19 treats `ref` as a prop. Avoid `forwardRef` unless an imperative handle is necessary.
- React Compiler handles ordinary memoization. Do not add `useMemo` or `useCallback` as performance defaults; follow
  compiler and hooks rules instead.
- Mount the shell through React Router with the application error boundary and a reload action; keep the default router
  error page out of the UI.
- React Grab runs only in development and activates with `Meta+G`.
- Render absent UI as `condition ? <Component /> : null`, not boolean coercion chains.

## Boundaries and UI

- Decode untrusted form, URL, storage, or external values with Effect Schema at the boundary. Keep decoded values typed
  and local; do not let parser-shaped `unknown` leak through UI or domain APIs.
- Use Tailwind v4 tokens and the established spacing/color system before arbitrary values. Express real component
  variants with `tailwind-variants`; keep global tokens and graph-specific CSS in `src/styles.css`.
- Compose interactive primitives from `@base-ui/react`, style their parts with Tailwind, and preserve visible focus. Use
  Base UI `render` composition and set `nativeButton={false}` for button-styled links; use `data-[starting-style]` and
  `data-[ending-style]` for transitions.

- Build CSS class values from complete tokens; ESLint rejects interpolation and concatenation in class expressions.

## Tooling

- Oxlint/Oxfmt owns code; ESLint owns Tailwind class correctness and React hooks; Prettier owns Markdown and YAML.
- `@typescript/native` provides TypeScript 7 for `tsc`; the `typescript` alias supplies the TypeScript 6 API required by
  ESLint. Keep both roles when updating dependencies.
- Development and preview bind to `127.0.0.1:5173` with `strictPort`; reuse an existing server or stop the one you
  started before switching modes.

## Validation

For fewer than ten changed files, pass their paths to the scoped checks. Run the applicable commands in this order:

1. `just ox-check <paths...>` for changed code, CSS, HTML, or JSON files.
2. `just eslint-check <paths...>` for changed TS or TSX files.
3. `just prettier-check <paths...>` for changed Markdown or YAML files.
4. `just tsc-check` when TypeScript changed.
5. `just test-agent` when behavior or tests changed.
6. `just build` when the browser bundle or Vite configuration changed.

Use `just full-check` as the final aggregate check when its full-project scope is warranted. Fix only failures caused by
your changes. After browser changes, inspect the rendered app and exercise changed interactions, light/dark themes, and
relevant error states.
