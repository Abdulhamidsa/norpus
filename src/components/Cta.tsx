import React, { forwardRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Star } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import { trackCTAClick, trackExternalLink } from "@/lib/analytics-events";

type ProcessProps = {
  leaveLink?: () => void;
  enterButton: () => void;
  leaveButton?: () => void;
};

export const Cta = forwardRef<HTMLDivElement, ProcessProps>(({ leaveLink, enterButton }, ref) => {
  const { t } = useTranslation();
  return (
    <>
      {/* Enhanced CTA Section with Cool Effects */}
      <section ref={ref} className="py-20 relative overflow-hidden">
        {/* Multi-layer background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-accent/8 to-primary/5 pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/8 via-transparent to-transparent"></div>

        {/* Cool floating elements */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-40 h-40 bg-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/3 w-32 h-32 bg-secondary/8 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        />
        <motion.div
          className="absolute top-2/3 left-1/2 w-24 h-24 bg-primary/5 rounded-full blur-xl"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 6,
          }}
        />

        <div className="container mx-auto px-4 relative">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="max-w-3xl mx-auto text-center">
            {/* Cool badge */}
            {/* <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="flex items-center justify-center mb-8">
              <div className="flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full border border-primary/20 backdrop-blur-sm">
                <Sparkles className="h-4 w-4 text-primary animate-pulse" />
                <span className="text-sm font-medium bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Ready to transform?</span>
                <Star className="h-4 w-4 text-secondary animate-pulse" />
              </div>
            </motion.div> */}

            {/* Enhanced heading */}
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.3 }} className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">{t("cta.title")}</span>
            </motion.h2>

            {/* Cool subtitle */}
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.4 }} className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              {t("cta.subtitle")}
            </motion.p>

            {/* SIMPLIFIED BUTTON DESIGN */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.5 }} className="mb-8">
              <motion.div className="relative inline-block group">
                {/* Subtle glowing border */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-xl opacity-20 group-hover:opacity-40 transition duration-300"></div>

                {/* Clean button */}
                <motion.a
                  href="https://form.norpus.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative inline-flex items-center gap-3 px-6 py-3 bg-background/80 backdrop-blur-sm border border-border/20 rounded-lg font-medium text-foreground hover:text-primary transition-all duration-300 group"
                  onMouseEnter={enterButton}
                  onMouseLeave={leaveLink}
                  onClick={() => {
                    trackCTAClick("main_cta_section");
                    trackExternalLink("form.norpus.com", "cta_section");
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Simple hover background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Button text */}
                  <span className="relative z-10 font-medium">{t("cta.button")}</span>

                  {/* Simple arrow */}
                  <ArrowRight className="relative z-10 h-5 w-5 text-primary transition-transform group-hover:translate-x-1 duration-300" />
                </motion.a>
              </motion.div>
            </motion.div>

            {/* Enhanced trust indicators with clean design */}
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.6 }} className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground">
              <motion.div className="flex items-center gap-3" whileHover={{ scale: 1.02 }}>
                <div className="w-1.5 h-1.5 bg-primary/60 rounded-full"></div>
                <span>{t("whyus.features.consultation")}</span>
              </motion.div>
              <div className="hidden sm:block w-px h-4 bg-border/50"></div>
              <motion.div className="flex items-center gap-3" whileHover={{ scale: 1.02 }}>
                <div className="w-1.5 h-1.5 bg-primary/60 rounded-full"></div>
                <span>{t("whyus.features.obligations")}</span>
              </motion.div>
              <div className="hidden sm:block w-px h-4 bg-border/50"></div>
              <motion.div className="flex items-center gap-3" whileHover={{ scale: 1.02 }}>
                <div className="w-1.5 h-1.5 bg-primary/60 rounded-full"></div>
                <span>{t("whyus.features.response")}</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
});
Cta.displayName = "Cta";
