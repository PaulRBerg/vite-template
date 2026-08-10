import { Schema } from "effect";

export const EmailSchema = Schema.Struct({
  email: Schema.String.pipe(
    Schema.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
      message: () => "Enter a valid email address.",
    })
  ),
});

export type Email = Schema.Schema.Type<typeof EmailSchema>;

export const decodeEmail = Schema.decodeUnknown(EmailSchema);
