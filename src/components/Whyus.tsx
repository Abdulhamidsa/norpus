"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, LaptopIcon, Users, Rocket, Video, Globe } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";

type Props = {
  enterLink: () => void;
  leaveLink?: () => void;
};

export const WhyUs = forwardRef<HTMLDivElement, Props>(({ enterLink, leaveLink }, ref) => {
  const { t } = useTranslation();

  const features = [
    { icon: <LaptopIcon className="h-6 w-6" />, key: "0" },
    { icon: <ShieldCheck className="h-6 w-6" />, key: "1" },
    { icon: <Video className="h-6 w-6" />, key: "2" },
    { icon: <Users className="h-6 w-6" />, key: "3" },
    { icon: <Rocket className="h-6 w-6" />, key: "4" },
    { icon: <Globe className="h-6 w-6" />, key: "5" },
  ];

  return (
    <section ref={ref} onMouseEnter={enterLink} onMouseLeave={leaveLink} className="py-20 bg-gradient-to-b from-background to-accent/5">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">{t("whyus.title")}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t("whyus.subtitle")}</p>
        </motion.div>

        {/* Features List */}
        <div className="max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className="group relative">
              {/* Feature Item */}
              <div className="flex items-start pl-15 gap-6 p-8 rounded-2xl hover:bg-accent/5 transition-colors duration-300 border-b border-border/50 last:border-b-0">
                {/* Icon */}
                <div className="flex-shrink-0 bg-primary w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300">
                  <div className="text-secondary">{feature.icon}</div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">{t(`whyus.point.${feature.key}.title`)}</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">{t(`whyus.point.${feature.key}.description`)}</p>
                </div>

                {/* Number indicator */}
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary/70 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">{String(index + 1).padStart(2, "0")}</div>
              </div>

              {/* Subtle hover line */}
              <div className="absolute left-8 top-0 w-0.5 h-full bg-gradient-to-b from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>

        {/* Bottom accent */}
        <motion.div initial={{ opacity: 0, scaleX: 0 }} whileInView={{ opacity: 1, scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.8 }} className="mt-16 max-w-4xl mx-auto">
          <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
});

WhyUs.displayName = "WhyUs";
