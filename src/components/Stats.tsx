import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, Star, Users, Award } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import { cn } from "@/lib/utils";

export const Stats = () => {
  const { t } = useTranslation();

  return (
    <>
      {" "}
      {/* Stats Section */}
      <section className="py-16 bg-accent/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <AnimatedStat value={150} label={t("stats.projects")} icon={<Briefcase className="h-6 w-6" />} />
            <AnimatedStat value={98} label={t("stats.satisfaction")} suffix="%" icon={<Star className="h-6 w-6" />} />
            <AnimatedStat value={50} label={t("stats.clients")} icon={<Users className="h-6 w-6" />} />
            <AnimatedStat value={12} label={t("stats.awards")} icon={<Award className="h-6 w-6" />} />
          </div>
        </div>
      </section>
    </>
  );
};

// Component for animated stats
function AnimatedStat({ value, label, suffix = "", icon }: { value: number; label: string; suffix?: string; icon: React.ReactNode }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const duration = 2000; // ms
      const frameDuration = 1000 / 60; // 60fps
      const totalFrames = Math.round(duration / frameDuration);
      const easeOutQuad = (t: number) => t * (2 - t);

      let frame = 0;
      const counter = setInterval(() => {
        frame++;
        const progress = easeOutQuad(frame / totalFrames);
        setCount(Math.floor(progress * value));

        if (frame === totalFrames) {
          clearInterval(counter);
        }
      }, frameDuration);

      return () => clearInterval(counter);
    }
  }, [isInView, value]);

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} transition={{ duration: 0.5 }} className="flex flex-col items-center text-center">
      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">{icon}</div>
      <div className="text-3xl md:text-4xl font-bold mb-2">
        {count}
        {suffix}
      </div>
      <p className="text-muted-foreground">{label}</p>
    </motion.div>
  );
}
