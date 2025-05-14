import React, { forwardRef } from "react";
import AnimatedBackground from "./animated-background";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

import { useTranslation } from "@/hooks/use-translation";

type HeroProps = {
  enterButton: () => void;
  leaveLink?: () => void;
  scrollTo?: (ref: React.RefObject<HTMLElement>) => void;
};

export const Hero = forwardRef<HTMLDivElement, HeroProps>(({ enterButton, leaveLink }, ref) => {
  const { t } = useTranslation();

  return (
    <>
      {/* Hero Section */}
      <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <AnimatedBackground />

        <motion.div className="container mx-auto px-4 py-20 relative z-10 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
            {t("hero.title.start")} <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">{t("hero.title.highlight")}</span> {t("hero.title.end")}
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            {t("hero.subtitle")}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="group text-lg px-8 py-6 cursor-pointer"
              onMouseEnter={enterButton}
              onMouseLeave={leaveLink}
              onClick={() => {
                window.open("https://form-subbmition.vercel.app/", "_blank");
              }}
            >
              {t("hero.cta")}
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </motion.div>
        <motion.div className="absolute bottom-10 left-1/2 transform -translate-x-1/2" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.8 }}>
          <motion.div
            className="w-8 h-12 border-2 border-purple-400/60 rounded-full flex justify-center"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
            style={{
              background: "linear-gradient(180deg, rgba(168,85,247,0.15) 0%, rgba(236,72,153,0.15) 100%)",
            }}
          >
            <motion.div
              className="w-1.5 h-3 rounded-full mt-2"
              style={{
                background: "linear-gradient(180deg, #a855f7 0%, #ec4899 100%)",
              }}
              animate={{ y: [0, 15, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </section>
    </>
  );
});

Hero.displayName = "Hero";
