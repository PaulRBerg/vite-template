import { Dialog } from "@base-ui/react/dialog";
import { Braces, X } from "lucide-react";

import { Button } from "@/ui/button.js";

const SIGNALS = [
  "Vite 8, React 19, and TypeScript",
  "Tailwind CSS v4 with semantic tokens",
  "Effect Schema at the client boundary",
  "Base UI primitives with keyboard support",
];

export function TemplateDialog() {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="inline-flex min-h-10 cursor-pointer items-center gap-2 border border-line-strong px-4 text-sm font-semibold text-ink transition-colors hover:border-violet hover:bg-violet-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus">
        <Braces className="size-4" strokeWidth={1.8} />
        Inspect the signal
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-(--z-modal) bg-ink/35 backdrop-blur-xs transition-opacity data-ending-style:opacity-0 data-starting-style:opacity-0 motion-reduce:transition-none" />
        <Dialog.Popup className="fixed top-1/2 left-1/2 z-(--z-modal) grid w-[calc(100%-2rem)] max-w-lg -translate-1/2 gap-6 border border-line-strong bg-canvas p-6 text-ink shadow-graph transition-all data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0 motion-reduce:transition-none">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-xs font-bold tracking-[0.16em] text-amber-ink uppercase">
                Template boundary
              </p>
              <Dialog.Title className="mt-2 text-xl/7 font-semibold tracking-tight">
                A small graph with useful edges.
              </Dialog.Title>
            </div>
            <Dialog.Close className="grid size-9 shrink-0 cursor-pointer place-items-center border border-line text-muted transition-colors hover:border-violet hover:bg-violet-soft hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus">
              <X className="size-4" strokeWidth={1.8} />
              <span className="sr-only">Close dialog</span>
            </Dialog.Close>
          </div>
          <Dialog.Description className="text-sm/6 text-muted">
            Keep the application edge thin: modules compile quickly, styles stay local, and runtime
            input is decoded before it becomes application data.
          </Dialog.Description>
          <ul className="grid gap-3 border-y border-line py-5 text-sm/6">
            {SIGNALS.map((signal) => (
              <li className="flex gap-3" key={signal}>
                <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 bg-amber" />
                {signal}
              </li>
            ))}
          </ul>
          <div>
            <Dialog.Close render={<Button size="sm">Return to the graph</Button>} />
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
