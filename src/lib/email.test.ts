import { Result } from "effect";
import { describe, expect, it } from "vitest";

import { decodeEmail } from "@/lib/email.js";

describe("decodeEmail", () => {
  it("returns a typed valid email", () => {
    const result = decodeEmail({ email: "developer@vite.dev" });

    expect(Result.isSuccess(result)).toBe(true);
    expect(result).toEqual(Result.succeed({ email: "developer@vite.dev" }));
  });

  it.each(["", "not-an-email", " developer@vite.dev "])("rejects %j", (email) => {
    const result = decodeEmail({ email });

    expect(Result.isFailure(result)).toBe(true);
  });
});
