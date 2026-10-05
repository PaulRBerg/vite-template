import { Schema } from "effect";

export const EmailSchema = Schema.Struct({
  email: Schema.String.check(
    Schema.isPattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/u, {
      message: "Enter a valid email address.",
    })
  ),
});

export type Email = typeof EmailSchema.Type;

export const decodeEmail = Schema.decodeUnknownResult(EmailSchema);
