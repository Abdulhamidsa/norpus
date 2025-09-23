import React, { forwardRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";

import { SectionHeading } from "./ui/section-heading";

type ProcessProps = {
  leaveLink?: () => void;
  enterButton: () => void;
  leaveButton?: () => void;
};

export const Cta = forwardRef<HTMLDivElement, ProcessProps>(({ leaveLink, enterButton }, ref) => {
  const { t } = useTranslation();
  return (
    <>
      {/* CTA Section */}
      <section ref={ref} className="min-h-screen flex flex-col justify-center py-20 pt-10 relative">
        {/* Subtle background accent */}
        <div className="absolute inset-0 bg-gradient-to-b from-background to-accent/5 pointer-events-none"></div>

        <div className="container mx-auto px-4 relative">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="mx-auto max-w-3xl flex flex-col items-center">
            {/* Option 1: Dot with gradient lines */}
            {/* <div className="flex items-center justify-center mb-10">
              <div className="h-px w-6 bg-gradient-to-r from-transparent to-primary/60"></div>
              <div className="w-2 h-2 rounded-full bg-primary mx-2"></div>
              <div className="h-px w-6 bg-gradient-to-l from-transparent to-primary/60"></div>
            </div> */}

            {/* Content */}
            <div className="text-center mb-10 relative">
              <h2 className="text-3xl md:text-4xl font-semibold mb-6 relative">
                Ready to Transform Your Digital Presence?
                {/* Option 2: Underline accent that grows on hover (added via pseudo-element) */}
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-0.5 w-16 bg-gradient-to-r from-primary/80 to-primary/30 group-hover:w-32 transition-all duration-700"></span>
              </h2>
              <p className="text-base text-muted-foreground max-w-xl mx-auto">{t("cta.subtitle")}</p>
            </div>

            {/* Button with enhanced styling */}
            <a href="https://form.norpus.com/" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center py-3 px-8 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-all" onMouseEnter={enterButton} onMouseLeave={leaveLink}>
              <span className="font-medium">{t("cta.button")}</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1.5" />
            </a>

            {/* Optional caption text */}
            <p className="mt-5 text-xs text-muted-foreground">No obligations. Free initial consultation.</p>
          </motion.div>
        </div>
      </section>
    </>
  );
});
Cta.displayName = "Cta";
