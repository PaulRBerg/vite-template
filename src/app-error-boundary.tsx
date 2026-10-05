import { RotateCcw, TriangleAlert } from "lucide-react";

import { Button } from "@/ui/button.js";

export function AppErrorBoundary() {
  return (
    <main className="grid min-h-dvh place-items-center bg-canvas px-5 text-ink">
      <section className="w-full max-w-xl border border-line-strong bg-paper p-8 shadow-graph">
        <TriangleAlert aria-hidden="true" className="size-8 text-danger" />
        <h1 className="mt-5 text-3xl font-semibold tracking-tight">Something went wrong.</h1>
        <p className="mt-4 text-base/7 text-muted">
          An unexpected error interrupted the application. Reload to try again.
        </p>
        <Button className="mt-6" onClick={() => window.location.reload()}>
          <RotateCcw aria-hidden="true" className="size-4" />
          Reload application
        </Button>
      </section>
    </main>
  );
}
