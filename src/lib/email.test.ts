import { Effect, Either } from "effect";
import { describe, expect, it } from "vitest";

import { decodeEmail } from "@/lib/email.js";

describe("decodeEmail", () => {
  it("returns a typed valid email", () => {
    const result = Effect.runSync(Effect.either(decodeEmail({ email: "developer@vite.dev" })));

    expect(Either.isRight(result)).toBe(true);
    expect(result).toEqual(Either.right({ email: "developer@vite.dev" }));
  });

  it.each(["", "not-an-email", " developer@vite.dev "])("rejects %j", (email) => {
    const result = Effect.runSync(Effect.either(decodeEmail({ email })));

    expect(Either.isLeft(result)).toBe(true);
  });
});
