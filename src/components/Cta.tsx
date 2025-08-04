import { motion } from "framer-motion";
import React, { forwardRef } from "react";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

type ProcessProps = {
  leaveLink?: () => void;
  enterButton: () => void;
  leaveButton?: () => void;
};
import { useTranslation } from "@/hooks/use-translation";

export const Cta = forwardRef<HTMLDivElement, ProcessProps>(({ leaveLink, enterButton }, ref) => {
  const { t } = useTranslation();
  return (
    <>
      {/* CTA Section */}
      <section ref={ref} className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative mx-auto max-w-2xl rounded-3xl bg-background/90 backdrop-blur-lg border border-border/30 shadow-2xl p-8 md:p-14 flex flex-col items-center text-center overflow-hidden"
          >
            {/* Minimal, subtle accent */}
            <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-black/40 via-background/80 to-black/20 opacity-70" />
            <div className="relative z-10 flex flex-col items-center">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-foreground drop-shadow-lg">{t("cta.title")}</h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-10">{t("cta.subtitle")}</p>
              <Button
                size="lg"
                className="group text-lg px-10 py-6 rounded-md font-semibold shadow-lg bg-primary/50 text-foreground hover:bg-transparent border hover:border focus:ring-4 focus:ring-ring/30 transition-all duration-200"
                onMouseEnter={enterButton}
                onMouseLeave={leaveLink}
                onClick={() => {
                  window.open("https://form.norpus.com/", "_blank");
                }}
              >
                {t("cta.button")}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
});
Cta.displayName = "Cta";
