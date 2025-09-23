"use client";

import { motion } from "framer-motion";

interface SectionSeparatorProps {
  variant?: "line" | "dots" | "gradient";
  className?: string;
}

export function SectionSeparator({ variant = "gradient", className = "" }: SectionSeparatorProps) {
  if (variant === "line") {
    return (
      <div className={`py-16 ${className}`}>
        <div className="container mx-auto px-4">
          <motion.div initial={{ scaleX: 0, opacity: 0 }} whileInView={{ scaleX: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: "easeInOut" }} className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>
      </div>
    );
  }

  if (variant === "dots") {
    return (
      <div className={`py-16 ${className}`}>
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="flex items-center justify-center gap-2">
            <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: 0.1 }} className="w-1.5 h-1.5 bg-primary/40 rounded-full" />
            <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: 0.2 }} className="w-2 h-2 bg-primary/60 rounded-full" />
            <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: 0.3 }} className="w-1.5 h-1.5 bg-primary/40 rounded-full" />
          </motion.div>
        </div>
      </div>
    );
  }

  // Default gradient variant
  return (
    <div className={`py-12 ${className}`}>
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative">
          {/* Gradient line with glow effect */}
          <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/40 to-transparent blur-sm" />
          </div>

          {/* Center ornament */}
          <motion.div initial={{ scale: 0, rotate: -180 }} whileInView={{ scale: 1, rotate: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-3 h-3 border border-primary/30 rotate-45 bg-background relative">
              <div className="absolute inset-0.5 bg-primary/10 rounded-sm" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
