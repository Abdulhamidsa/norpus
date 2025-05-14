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

  return (
    <section ref={ref} onMouseEnter={enterLink} onMouseLeave={leaveLink} className="py-20 bg-accent/5">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="container mx-auto px-4 text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">{t("whyus.title")}</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t("whyus.subtitle")}</p>
      </motion.div>

      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <WhyUsCard icon={<LaptopIcon className="h-8 w-8" />} title={t("whyus.point.0")} description={t("whyus.point.0")} delay={0} />
        <WhyUsCard icon={<ShieldCheck className="h-8 w-8" />} title={t("whyus.point.1")} description={t("whyus.point.1")} delay={0.1} />
        <WhyUsCard icon={<Video className="h-8 w-8" />} title={t("whyus.point.2")} description={t("whyus.point.2")} delay={0.2} />
        <WhyUsCard icon={<Users className="h-8 w-8" />} title={t("whyus.point.3")} description={t("whyus.point.3")} delay={0.3} />
        <WhyUsCard icon={<Rocket className="h-8 w-8" />} title={t("whyus.point.4")} description={t("whyus.point.4")} delay={0.4} />
        <WhyUsCard icon={<Globe className="h-8 w-8" />} title={t("whyus.point.5")} description={t("whyus.point.5")} delay={0.5} />
      </div>
    </section>
  );
});

WhyUs.displayName = "WhyUs";

function WhyUsCard({ icon, title, description, delay = 0 }: { icon: React.ReactNode; title: string; description: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all text-left"
    >
      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  );
}
