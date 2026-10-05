import { Result } from "effect";
import { Check, Mail, TriangleAlert } from "lucide-react";
import type { FormEvent } from "react";
import { useState } from "react";

import { decodeEmail } from "@/lib/email.js";
import { Button } from "@/ui/button.js";

type ValidationState =
  | { email: string; status: "success" }
  | { message: string; status: "error" }
  | { status: "idle" };

export function EmailValidationDemo() {
  const [state, setState] = useState<ValidationState>({ status: "idle" });

  function validateEmail(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const input: unknown = { email: form.get("email") };
    const result = decodeEmail(input);

    if (Result.isSuccess(result)) {
      setState({ email: result.success.email, status: "success" });
    } else {
      setState({
        message: "Enter an email without spaces, using name@example.com.",
        status: "error",
      });
    }
  }

  const messageId = "email-validation-message";

  return (
    <section
      aria-labelledby="validation-title"
      className="grid gap-6 border-y border-line py-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(22rem,1.1fr)] lg:items-center lg:gap-12 lg:py-12"
    >
      <div>
        <p className="font-mono text-xs font-bold tracking-[0.16em] text-amber-ink uppercase">
          Client-only boundary
        </p>
        <h2 className="mt-3 text-2xl/8 font-semibold tracking-tight" id="validation-title">
          Decode once. Keep the good data.
        </h2>
        <p className="mt-3 max-w-xl text-base/7 text-muted">
          This form has no endpoint. Effect Schema receives unknown form input at one boundary, then
          the UI keeps the typed email it decoded.
        </p>
      </div>
      <form
        className="grid gap-4 border border-line-strong bg-paper p-5"
        noValidate
        onSubmit={validateEmail}
      >
        <label className="grid gap-2 text-sm font-semibold" htmlFor="email">
          Email address
          <span className="relative">
            <Mail
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted"
              strokeWidth={1.7}
            />
            <input
              aria-describedby={state.status === "idle" ? undefined : messageId}
              aria-invalid={state.status === "error"}
              autoComplete="email"
              className="min-h-11 w-full border border-line-strong bg-canvas py-2 pr-3 pl-10 text-base transition-colors outline-none placeholder:text-muted focus:border-violet focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
              id="email"
              inputMode="email"
              name="email"
              placeholder="you@example.com"
              type="email"
            />
          </span>
        </label>
        <Button className="justify-self-start" type="submit" variant="primary">
          Validate locally
        </Button>
        {state.status === "error" ? (
          <p className="flex items-start gap-2 text-sm/6 text-danger" id={messageId} role="alert">
            <TriangleAlert
              aria-hidden="true"
              className="mt-0.5 size-4 shrink-0"
              strokeWidth={1.8}
            />
            {state.message}
          </p>
        ) : null}
        {state.status === "success" ? (
          <p className="flex items-start gap-2 text-sm/6 text-success" id={messageId} role="status">
            <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0" strokeWidth={2} />
            Decoded: <span className="font-mono">{state.email}</span>
          </p>
        ) : null}
      </form>
    </section>
  );
}
