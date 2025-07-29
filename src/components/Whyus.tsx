"use client";

import { motion } from "framer-motion";
import { ShieldCheck, LaptopIcon, Users, Rocket, Video, Globe } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import { forwardRef } from "react";
import React from "react";
import { SectionHeading } from "./ui/section-heading";

type Feature = { icon: React.ReactNode; key: string };
// MobileSlider component for horizontal chevron navigation
function MobileSlider({ features, t }: { features: Feature[]; t: (key: string) => string }) {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);

  // Update chevron visibility and active index on scroll
  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    // Find the closest slide to the left edge
    const children = Array.from(el.children) as HTMLElement[];
    let minDist = Infinity;
    let idx = 0;
    children.forEach((child, i) => {
      const dist = Math.abs(child.getBoundingClientRect().left - el.getBoundingClientRect().left);
      if (dist < minDist) {
        minDist = dist;
        idx = i;
      }
    });
    setActiveIndex(idx);
  };

  React.useEffect(() => {
    handleScroll();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollBy = (dir: number) => {
    if (scrollRef.current) {
      const width = scrollRef.current.offsetWidth * 0.85;
      scrollRef.current.scrollBy({ left: dir * width, behavior: "smooth" });
    }
  };

  return (
    <div className="relative">
      {/* Chevrons */}
      {canScrollLeft && (
        <button type="button" className="absolute left-0 top-1/2 -translate-y-1/2 z-10 md:hidden bg-background/80 rounded-full shadow p-2 border border-border" onClick={() => scrollBy(-1)} aria-label="Scroll left">
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}
      {canScrollRight && (
        <button type="button" className="absolute right-0 top-1/2 -translate-y-1/2 z-10 md:hidden bg-background/80 rounded-full shadow p-2 border border-border" onClick={() => scrollBy(1)} aria-label="Scroll right">
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
      <div ref={scrollRef} className="flex md:grid md:grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-2 md:pb-0 -mx-4 px-4 scrollbar-hide" style={{ scrollBehavior: "smooth" }}>
        {features.map((feature, index) => (
          <motion.div key={index} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className="group relative min-w-[85vw] max-w-xs md:min-w-0 md:max-w-none snap-center">
            {/* Feature Item */}
            <div className="flex flex-col md:flex-row items-start md:pl-15 gap-4 md:gap-6 p-6 md:p-8 rounded-2xl hover:bg-accent/5 transition-colors duration-300 border-b border-border/50 last:border-b-0">
              {/* Icon */}
              <div className="flex-shrink-0 bg-primary w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300 text-white mb-4 md:mb-0">
                {feature.icon}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">{t(`whyus.point.${feature.key}.title`)}</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">{t(`whyus.point.${feature.key}.description`)}</p>
              </div>

              {/* Number indicator */}
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary/70 transition-all duration-300 group-hover:bg-white group-hover:text-black mt-4 md:mt-0">{String(index + 1).padStart(2, "0")}</div>
            </div>

            {/* Subtle hover line */}
            <div className="absolute left-8 top-0 w-0.5 h-full bg-gradient-to-b from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.div>
        ))}
      </div>
      {/* Slide number indicator (mobile only) */}
      <div className="md:hidden flex justify-center mt-2 text-sm text-muted-foreground font-medium">
        {activeIndex + 1} / {features.length}
      </div>
    </div>
  );
}

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
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-16">
          <SectionHeading>{t("whyus.title")}</SectionHeading>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-center">{t("whyus.subtitle")}</p>
        </motion.div>

        {/* Features List */}
        <div className="max-w-4xl mx-auto relative">
          {/* Chevron buttons for mobile */}
          <MobileSlider features={features} t={t} />
        </div>

        {/* Bottom accent intentionally removed, handled by SectionHeading now */}
      </div>
    </section>
  );
});

WhyUs.displayName = "WhyUs";
