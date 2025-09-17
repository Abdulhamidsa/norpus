import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.98] gap-2",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-primary/30 shadow-sm",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90 focus-visible:ring-secondary/30 shadow-sm",
        outline: "border border-border bg-transparent hover:bg-accent/50 focus-visible:ring-accent/30",
        ghost: "bg-transparent hover:bg-accent/50 focus-visible:ring-accent/30",
        link: "text-primary underline-offset-4 hover:underline bg-transparent p-0 h-auto focus-visible:ring-transparent",
        muted: "bg-muted text-muted-foreground hover:bg-muted/80 focus-visible:ring-muted/30",
        gradient: "bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:from-primary/90 hover:to-secondary/90 focus-visible:ring-primary/30",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 px-3 py-1.5 text-xs",
        lg: "h-12 px-8 py-3 text-base",
        icon: "h-10 w-10 p-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp className={cn(buttonVariants({ variant, size, className }))} {...props}>
      {props.children}
    </Comp>
  );
}

export { Button, buttonVariants };
