import React from "react";
import { cn } from "@/lib/utils";

export function SectionHeading({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("mb-8 flex flex-col items-center", className)}>
      <h2 className="text-3xl md:text-5xl font-bold mb-2 text-center">{children}</h2>
      <div className="relative flex justify-center h-4 w-full">
        <span className="block h-1 w-16 rounded-full bg-gradient-to-r from-primary/40 via-primary to-primary/40" />
      </div>
    </div>
  );
}
