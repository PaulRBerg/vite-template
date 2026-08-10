import type { ButtonHTMLAttributes, ReactElement, ReactNode } from "react";
import { cloneElement } from "react";
import type { VariantProps } from "tailwind-variants";
import { tv } from "tailwind-variants";

import { cn } from "@/lib/cn.js";

const buttonStyles = tv({
  base: "inline-flex cursor-pointer items-center justify-center gap-2 font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus disabled:pointer-events-none disabled:opacity-45",
  defaultVariants: {
    size: "md",
    variant: "primary",
  },
  variants: {
    size: {
      lg: "min-h-12 px-5 text-base",
      md: "min-h-10 px-4 text-sm",
      sm: "min-h-8 px-3 text-xs",
    },
    variant: {
      ghost: "text-ink hover:bg-ink/6",
      primary: "bg-violet text-canvas shadow-xs hover:bg-violet-ink",
      secondary: "border border-line-strong text-ink hover:border-violet hover:bg-violet-soft",
    },
  },
});

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonStyles> & {
    asChild?: boolean;
    children: ReactNode;
  };

export function Button({
  asChild = false,
  children,
  className,
  size,
  variant,
  ...props
}: ButtonProps) {
  const classes = cn(buttonStyles({ size, variant }), className);

  if (asChild && typeof children === "object" && children !== null) {
    const child = children as ReactElement<Record<string, unknown>>;
    return cloneElement(child, {
      ...props,
      className: cn(
        typeof child.props.className === "string" ? child.props.className : undefined,
        classes
      ),
    });
  }

  return (
    <button className={classes} type="button" {...props}>
      {children}
    </button>
  );
}
