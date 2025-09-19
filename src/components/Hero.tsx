import React, { forwardRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import AnimatedBackground from "./animated-background";
import { Button } from "./ui/button";

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
            {t("hero.title.start")}{" "}
            <span className="bg-clip-text text-primary" style={{ background: "linear-gradient(90deg, hsl(var(--color-primary)), hsl(var(--color-secondary)))" }}>
              {t("hero.title.highlight")}
            </span>{" "}
            {t("hero.title.end")}
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            {t("hero.subtitle")}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="group text-lg px-8 py-6 cursor-pointer bg-primary/10 text-primary border border-l-4 border-l-primary border-primary shadow-md hover:bg-white hover:text-black hover:shadow-lg transition-all duration-300"
              onMouseEnter={enterButton}
              onMouseLeave={leaveLink}
              onClick={() => {
                window.open("https://form.norpus.com/", "_blank");
              }}
            >
              {/* Vertical accent border */}
              {/* <span className="absolute -left-5 top-2 bottom-2 w-1 rounded-full bg-primary" /> */}
              <span className="relative flex items-center">
                {t("hero.cta")}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:text-primary group-hover:scale-110" />
              </span>
            </Button>
          </motion.div>
        </motion.div>
        <motion.div className="absolute bottom-10 left-1/2 transform -translate-x-1/2" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.8 }}>
          <motion.div
            className="w-8 h-12 border-2 border-primary/60 rounded-full flex justify-center items-start overflow-visible"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
            style={{
              background: "linear-gradient(180deg, hsl(var(--color-primary) / 0.15) 0%, hsl(var(--color-secondary) / 0.15) 100%)",
            }}
          >
            <motion.div
              className="w-1.5 h-3 rounded-full mt-2"
              style={{
                background: "linear-gradient(180deg, hsl(var(--color-primary)) 0%, hsl(var(--color-secondary)) 100%)",
                boxShadow: "0 0 4px 1px hsl(var(--color-primary) / 0.3)",
                backgroundColor: "#fff",
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
