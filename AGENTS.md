# Vite development guidance

References: [project overview](./README.md), [dependencies and scripts](./package.json), [task recipes](./justfile), and
[Vite configuration](./vite.config.ts).

## Source conventions

- Use `kebab-case` directories and non-component files, `PascalCase.tsx` components, and `useCamelCase.ts` hooks.
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
- Render absent UI as `condition ? <Component /> : null`, not boolean coercion chains.

## Boundaries and UI

- Decode untrusted form, URL, storage, or external values with Effect Schema at the boundary. Keep decoded values typed
  and local; do not let parser-shaped `unknown` leak through UI or domain APIs.
- Use Tailwind v4 tokens and the established spacing/color system before arbitrary values. Express reusable component
  variants with `tailwind-variants`; keep global tokens and graph-specific CSS in `src/styles.css`.
- Compose interactive primitives from `@base-ui/react`, style their parts with Tailwind, and preserve visible focus.
  Base UI state belongs in client components; use `data-[starting-style]` and `data-[ending-style]` for transitions.

## Validation

For fewer than ten changed files, pass their paths to the scoped checks. Run the applicable commands in this order:

1. `just biome-check <paths...>` for changed TS, TSX, CSS, or JSON files.
2. `just eslint-check <paths...>` for changed TS or TSX files.
3. `just prettier-check <paths...>` for changed Markdown or YAML files.
4. `just type-check` when TypeScript changed.
5. `just test` when behavior or tests changed.
6. `just build` when the browser bundle or Vite configuration changed.

Use `just full-check` as the final aggregate check when its full-project scope is warranted. Fix only failures caused by
your changes.
