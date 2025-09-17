import { useTranslation } from "@/hooks/use-translation";
import { motion } from "framer-motion";
import { Globe, Layers, Database, Code, MessageSquare, Sparkles } from "lucide-react";
import React, { forwardRef } from "react";
import { SectionHeading } from "./ui/section-heading";
import { cn } from "@/lib/utils";
import { useMobile } from "@/hooks/use-mobile";

type ServicesProps = {
  enterButton: () => void;
  leaveLink?: () => void;
};

export const Services = forwardRef<HTMLDivElement, ServicesProps>(({ enterButton, leaveLink }, ref) => {
  const { t } = useTranslation();
  const isMobile = useMobile();

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background pointer-events-none"></div>
      <div className="absolute w-[800px] h-[800px] -top-[400px] -left-[400px] bg-primary/3 rounded-full blur-3xl"></div>
      <div className="absolute w-[600px] h-[600px] -bottom-[300px] -right-[300px] bg-secondary/3 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-16 md:mb-20">
          <SectionHeading>{t("services.title")}</SectionHeading>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-center">{t("services.subtitle")}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <ServiceCard icon={<Globe />} title={t("services.web.title")} description={t("services.web.description")} color="from-blue-500/20 to-cyan-500/20" delay={0.1} onMouseEnter={enterButton} onMouseLeave={leaveLink} />
          <ServiceCard icon={<Layers />} title={t("services.uiux.title")} description={t("services.uiux.description")} color="from-purple-500/20 to-pink-500/20" delay={0.2} onMouseEnter={enterButton} onMouseLeave={leaveLink} />
          <ServiceCard icon={<Database />} title={t("services.cloud.title")} description={t("services.cloud.description")} color="from-emerald-500/20 to-teal-500/20" delay={0.3} onMouseEnter={enterButton} onMouseLeave={leaveLink} />
          <ServiceCard icon={<Code />} title={t("services.software.title")} description={t("services.software.description")} color="from-orange-500/20 to-amber-500/20" delay={0.4} onMouseEnter={enterButton} onMouseLeave={leaveLink} />
          <ServiceCard icon={<MessageSquare />} title={t("services.strategy.title")} description={t("services.strategy.description")} color="from-indigo-500/20 to-violet-500/20" delay={0.5} onMouseEnter={enterButton} onMouseLeave={leaveLink} />
          <ServiceCard icon={<Sparkles />} title={t("services.ecommerce.title")} description={t("services.ecommerce.description")} color="from-rose-500/20 to-red-500/20" delay={0.6} onMouseEnter={enterButton} onMouseLeave={leaveLink} />
        </div>
      </div>
    </section>
  );
});

Services.displayName = "Services";

// Enhanced service card component
function ServiceCard({
  icon,
  title,
  description,
  color = "from-primary/20 to-secondary/20",
  delay = 0,
  onMouseEnter,
  onMouseLeave,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color?: string;
  delay?: number;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className={cn("group relative rounded-xl", "p-6 md:p-8 transition-all duration-300", "border border-border/40 hover:border-primary/30", "bg-background/50 backdrop-blur-sm")}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Subtle background gradient */}
      <div className={cn("absolute inset-0 bg-gradient-to-br opacity-[0.04] group-hover:opacity-[0.07] transition-opacity duration-500", color)} />

      {/* Icon with minimal styling that works on all devices */}
      <div className="relative z-10 mb-6 flex items-start">
        <div className={cn("rounded-lg p-3", "flex items-center justify-center", "bg-background border border-border/50", "text-primary/70 group-hover:text-primary transition-colors duration-300")}>
          <div className="h-6 w-6">{icon}</div>
        </div>
      </div>

      {/* Simple content styling that looks good on all devices */}
      <h3 className="text-xl font-medium mb-3 relative z-10 text-foreground group-hover:text-primary transition-colors duration-300">{title}</h3>
      <p className="text-muted-foreground leading-relaxed relative z-10">{description}</p>
    </motion.div>
  );
}
