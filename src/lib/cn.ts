import { twMerge } from "tailwind-merge";

export function cn(...classNames: (string | false | null | undefined)[]): string {
  return twMerge(classNames.filter(Boolean).join(" "));
}
