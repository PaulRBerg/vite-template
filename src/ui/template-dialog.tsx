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
      <Dialog.Trigger render={<Button variant="secondary" />}>
        <Braces aria-hidden="true" className="size-4" strokeWidth={1.8} />
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
            <Dialog.Close
              aria-label="Close dialog"
              render={<Button size="icon" variant="secondary" />}
            >
              <X aria-hidden="true" className="size-4" strokeWidth={1.8} />
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
