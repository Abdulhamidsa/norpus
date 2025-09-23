"use client";

import { forwardRef } from "react";
import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, LaptopIcon, Users, Rocket, Video, Globe } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
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
      {/* Clean Navigation Buttons */}
      {canScrollLeft && (
        <button
          type="button"
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 md:hidden bg-background/90 backdrop-blur-sm rounded-full p-2 border border-border/20 hover:border-primary/30 hover:bg-background text-muted-foreground hover:text-primary transition-colors duration-200"
          onClick={() => scrollBy(-1)}
          aria-label="Scroll left"
        >
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}
      {canScrollRight && (
        <button
          type="button"
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 md:hidden bg-background/90 backdrop-blur-sm rounded-full p-2 border border-border/20 hover:border-primary/30 hover:bg-background text-muted-foreground hover:text-primary transition-colors duration-200"
          onClick={() => scrollBy(1)}
          aria-label="Scroll right"
        >
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
      <div ref={scrollRef} className="flex md:grid md:grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-4 md:pb-0 -mx-2 px-2 scrollbar-hide" style={{ scrollBehavior: "smooth" }}>
        {features.map((feature, index) => (
          <motion.div key={index} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className="group relative min-w-[85vw] max-w-xs md:min-w-0 md:max-w-none snap-center">
            {/* Feature Item - Fixed height and width */}
            <div className="flex flex-col md:flex-row items-start gap-4 p-5 rounded-lg border border-border/40 hover:border-primary/30 transition-colors duration-300 bg-background h-[220px] md:h-[160px] w-full">
              {/* Icon */}
              <div className="flex-shrink-0 w-10 h-10 rounded-md flex items-center justify-center text-primary mb-2 md:mb-0 border border-border/40">{feature.icon}</div>

              {/* Content - with overflow handling */}
              <div className="flex-1 min-w-0 flex flex-col h-full overflow-hidden">
                <h3 className="text-base font-medium mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2 leading-tight">{t(`whyus.point.${feature.key}.title`)}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1 line-clamp-5 md:line-clamp-4">{t(`whyus.point.${feature.key}.description`)}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      {/* Simplified slide indicator (mobile only) */}
      <div className="md:hidden flex justify-center mt-4 gap-1.5">
        {features.map((_, index) => (
          <div key={index} className={`h-1.5 rounded-full transition-all ${index === activeIndex ? "w-6 bg-primary" : "w-1.5 bg-primary/30"}`} />
        ))}
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
    { icon: <LaptopIcon className="h-5 w-5" />, key: "0" },
    { icon: <ShieldCheck className="h-5 w-5" />, key: "1" },
    { icon: <Video className="h-5 w-5" />, key: "2" },
    { icon: <Users className="h-5 w-5" />, key: "3" },
    { icon: <Rocket className="h-5 w-5" />, key: "4" },
    { icon: <Globe className="h-5 w-5" />, key: "5" },
  ];

  return (
    <section ref={ref} onMouseEnter={enterLink} onMouseLeave={leaveLink} className="min-h-screen flex flex-col justify-start py-16 md:pt-16 relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/5 to-background pointer-events-none"></div>
      <div className="absolute w-[500px] h-[500px] -top-[250px] -right-[250px] bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute w-[400px] h-[400px] -bottom-[200px] -left-[200px] bg-secondary/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12">
          <SectionHeading>{t("whyus.title")}</SectionHeading>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-center">{t("whyus.subtitle")}</p>
        </motion.div>

        {/* Features List */}
        <div className="max-w-3xl mx-auto relative">
          {/* Chevron buttons for mobile */}
          <MobileSlider features={features} t={t} />
        </div>
      </div>
    </section>
  );
});

WhyUs.displayName = "WhyUs";
