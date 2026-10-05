# Vite Template [![Vite 8][vite-badge]][vite] [![React 19][react-badge]][react] [![TypeScript][typescript-badge]][typescript] [![License: MIT][license-badge]][license]

[vite]: https://vite.dev/
[vite-badge]: https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white
[react]: https://react.dev/
[react-badge]: https://img.shields.io/badge/React-19-087EA4?logo=react&logoColor=white
[typescript]: https://www.typescriptlang.org/
[typescript-badge]: https://img.shields.io/badge/TypeScript-7-3178C6?logo=typescript&logoColor=white
[license]: ./LICENSE.MD
[license-badge]: https://img.shields.io/badge/License-MIT-orange.svg

A production-ready static Vite template for React 19 and TypeScript, with React Compiler, Tailwind CSS v4, Base UI,
Effect, React Router, and a focused component showcase.

## Use this template

Select [Use this template](https://github.com/PaulRBerg/vite-template/generate) to create a repository, or clone it
directly:

```sh
git clone https://github.com/PaulRBerg/vite-template.git my-app
cd my-app
bun install
just --list
```

## Prerequisites

- [Bun](https://bun.sh) for dependencies and package scripts
- [Ni](https://github.com/antfu-collective/ni) for the commands used by the Just recipes
- [Just](https://just.systems) for the project command runner

## Commands

### Development

| Command        | Purpose                                     |
| -------------- | ------------------------------------------- |
| `just dev`     | Start the Vite development server.          |
| `just build`   | Create the production static build.         |
| `just preview` | Serve an existing production build locally. |
| `just clean`   | Remove build artifacts.                     |

Development and preview both use `http://127.0.0.1:5173` and fail if the port is occupied. React Grab is available in
development with `Meta+G`.

The equivalent package scripts are `bun run dev`, `bun run build`, and `bun run preview`.

### Quality and tests

| Command                          | Purpose                                           |
| -------------------------------- | ------------------------------------------------- |
| `just ox-check <paths...>`       | Check supported source formatting and lint rules. |
| `just ox-write <paths...>`       | Apply supported source formatting and lint fixes. |
| `just eslint-check <paths...>`   | Check React hooks and complete Tailwind tokens.   |
| `just eslint-write <paths...>`   | Apply ESLint fixes.                               |
| `just prettier-check <paths...>` | Check Markdown and YAML formatting.               |
| `just prettier-write <paths...>` | Format Markdown and YAML.                         |
| `just tsc-check`                 | Type-check the project.                           |
| `just test`                      | Run the Vitest suite.                             |
| `just full-check`                | Run lint, formatting, types, tests, and build.    |

`bun run test` runs the test script; `just test-agent` uses concise agent output. Code formatting and linting use
Oxlint/Oxfmt, with ESLint for React hooks and Tailwind classes. Type checking uses TypeScript 7, while ESLint uses the
TypeScript 6 compatibility API. See [`AGENTS.md`](./AGENTS.md) for source conventions and the required validation order
when contributing.

## Structure and customization

The showcase lives in `src/`: its module-graph visual, Button variants, Base UI dialog, and local Effect Schema email
validation are intentionally small examples rather than an application architecture. Keep browser code in that graph;
place reusable UI in `src/ui/` and shared non-UI helpers in `src/lib/`.

Customize the visual system in `src/styles.css`, compose accessible interactions from Base UI primitives, and extend the
showcase from `src/app.tsx`. The client mounts through React Router with a catch-all route and a styled error boundary
with a reload action. Add routes in `src/main.tsx`; production hosting must serve `index.html` for client routes. The
template has no backend or runtime environment configuration.

## License

Licensed under the [MIT License](./LICENSE.MD).
