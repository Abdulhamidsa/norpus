import React from "react";
import { cn } from "@/lib/utils";

export function SectionHeading({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("mb-8 flex flex-col items-center", className)}>
      <h2 className="text-3xl md:text-5xl font-bold mb-2 text-center">{children}</h2>
      <div className="flex flex-col items-center">
        <div className="w-16 h-0.5 bg-gradient-to-r from-primary/80 to-primary/10"></div>
      </div>
    </div>
  );
}
