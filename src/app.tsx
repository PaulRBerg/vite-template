import { ArrowDownRight, ArrowUpRight, Blocks, CodeXml, Palette, Zap } from "lucide-react";

import { Button } from "@/ui/button.js";
import { EmailValidationDemo } from "@/ui/email-validation-demo.js";
import { TemplateDialog } from "@/ui/template-dialog.js";

const STACK_NODES = [
  { detail: "Fast local feedback", icon: Zap, name: "compiler", tone: "amber" },
  { detail: "Tokens close to the surface", icon: Palette, name: "styles", tone: "violet" },
  { detail: "Unknown becomes typed", icon: CodeXml, name: "schema", tone: "amber" },
  { detail: "Accessible interaction", icon: Blocks, name: "runtime", tone: "violet" },
] as const;

function ModuleGraph() {
  return (
    <div
      aria-label="A graph linking compiler, styles, schema, and runtime"
      className="relative"
      data-graph="frame"
      role="img"
    >
      <svg aria-hidden="true" data-graph="lines" viewBox="0 0 560 420">
        <path d="M92 92 L276 108 L456 86" />
        <path d="M92 92 L178 292 L442 316" />
        <path d="M276 108 L178 292" />
        <path d="M276 108 L442 316" />
        <path d="M178 292 L456 86" />
      </svg>
      <span data-graph-node="compiler">compiler</span>
      <span data-graph-node="styles">styles</span>
      <span data-graph-node="schema">schema</span>
      <span data-graph-node="runtime">runtime</span>
      <span aria-hidden="true" data-graph-pulse="one" />
      <span aria-hidden="true" data-graph-pulse="two" />
      <p data-graph="caption">edit a module · observe the signal</p>
    </div>
  );
}

export function App() {
  return (
    <main className="min-h-dvh overflow-hidden bg-canvas text-ink">
      <div className="mx-auto grid max-w-7xl border-x border-line">
        <header className="flex min-h-16 items-center justify-between gap-4 border-b border-line px-5 py-3 sm:px-8">
          <a
            className="group flex items-center gap-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
            href="#top"
          >
            <span
              aria-hidden="true"
              className="grid size-8 place-items-center bg-violet text-canvas"
            >
              <span className="size-2 bg-amber" />
            </span>
            <span className="font-mono text-xs font-bold tracking-[0.15em] uppercase">
              Vite template
            </span>
          </a>
          <a
            className="hidden items-center gap-2 text-sm font-semibold text-muted transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus sm:inline-flex"
            href="#validation"
          >
            Try the boundary <ArrowDownRight className="size-4" strokeWidth={1.8} />
          </a>
        </header>

        <section
          className="grid border-b border-line lg:grid-cols-[minmax(0,1.02fr)_minmax(28rem,0.98fr)]"
          id="top"
        >
          <div className="px-5 pt-16 pb-12 sm:px-8 sm:pt-24 lg:py-28 xl:px-12">
            <p className="font-mono text-xs font-bold tracking-[0.16em] text-amber-ink uppercase">
              React 19 · Vite 8 · Bun
            </p>
            <h1 className="mt-5 max-w-2xl text-5xl/[0.98] font-semibold tracking-[-0.055em] sm:text-6xl/[0.96]">
              Start where the change is felt.
            </h1>
            <p className="mt-6 max-w-xl text-base/7 text-muted sm:text-lg/8">
              A public template for applications that treat Vite as a live module and signal
              graph—not a black box behind a landing page.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button nativeButton={false} render={<a href="#validation" />} size="lg">
                Edit the boundary <ArrowDownRight className="size-4" strokeWidth={1.8} />
              </Button>
              <TemplateDialog />
            </div>
            <p className="mt-8 font-mono text-xs/5 text-muted">
              src/app.tsx <span aria-hidden="true">→</span> instant feedback
            </p>
          </div>
          <div className="border-t border-line px-5 py-10 sm:px-8 lg:border-t-0 lg:border-l lg:px-10 lg:py-12 xl:px-12">
            <ModuleGraph />
          </div>
        </section>

        <section aria-labelledby="stack-title" className="px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="font-mono text-xs font-bold tracking-[0.16em] text-amber-ink uppercase">
                Stack nodes
              </p>
              <h2 className="mt-3 text-2xl/8 font-semibold tracking-tight" id="stack-title">
                Four edges, deliberately kept close.
              </h2>
            </div>
            <p className="max-w-md text-sm/6 text-muted">
              Each node has one job, a visible input, and a useful connection to the next.
            </p>
          </div>
          <ul className="mt-8 grid border-t border-l border-line sm:grid-cols-2 lg:grid-cols-4">
            {STACK_NODES.map(({ detail, icon: Icon, name, tone }) => (
              <li
                className="group min-h-44 border-r border-b border-line bg-paper p-5 transition-colors hover:bg-canvas-deep"
                key={name}
              >
                <Icon
                  className={tone === "amber" ? "size-5 text-amber-ink" : "size-5 text-violet-ink"}
                  strokeWidth={1.65}
                />
                <h3 className="mt-8 font-mono text-sm font-bold tracking-wide">{name}</h3>
                <p className="mt-2 text-sm/6 text-muted">{detail}</p>
              </li>
            ))}
          </ul>
        </section>

        <div className="px-5 sm:px-8 lg:px-12" id="validation">
          <EmailValidationDemo />
        </div>

        <footer className="flex flex-wrap items-center justify-between gap-4 px-5 py-6 sm:px-8 lg:px-12">
          <p className="font-mono text-xs/5 text-muted">
            public template · client-first · no runtime configuration
          </p>
          <a
            className="inline-flex items-center gap-2 text-sm font-semibold text-violet-ink hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
            href="#top"
          >
            Back to source <ArrowUpRight className="size-4" strokeWidth={1.8} />
          </a>
        </footer>
      </div>
    </main>
  );
}
