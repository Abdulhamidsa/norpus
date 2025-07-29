import { useTranslation } from "@/hooks/use-translation";
import { motion } from "framer-motion";
import { Globe, Layers, Database, Code, MessageSquare } from "lucide-react";
import React, { forwardRef } from "react";
import { SectionHeading } from "./ui/section-heading";

type HeroProps = {
  enterButton: () => void;
  leaveLink?: () => void;
};

export const Services = forwardRef<HTMLDivElement, HeroProps>(({ enterButton, leaveLink }, ref) => {
  const { t } = useTranslation();

  return (
    <>
      {/* Services Section */}
      <section ref={ref} className="py-20">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-16">
            <SectionHeading>{t("services.title")}</SectionHeading>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-center">{t("services.subtitle")}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard icon={<Globe className="h-10 w-10" />} title={t("services.web.title")} description={t("services.web.description")} delay={0} onMouseEnter={enterButton} onMouseLeave={leaveLink} />
            <ServiceCard icon={<Layers className="h-10 w-10" />} title={t("services.uiux.title")} description={t("services.uiux.description")} delay={0.1} onMouseEnter={enterButton} onMouseLeave={leaveLink} />
            <ServiceCard icon={<Database className="h-10 w-10" />} title={t("services.cloud.title")} description={t("services.cloud.description")} delay={0.2} onMouseEnter={enterButton} onMouseLeave={leaveLink} />
            <ServiceCard icon={<Code className="h-10 w-10" />} title={t("services.software.title")} description={t("services.software.description")} delay={0.3} onMouseEnter={enterButton} onMouseLeave={leaveLink} />
            <ServiceCard icon={<MessageSquare className="h-10 w-10" />} title={t("services.strategy.title")} description={t("services.strategy.description")} delay={0.4} onMouseEnter={enterButton} onMouseLeave={leaveLink} />
            <ServiceCard icon={<Layers className="h-10 w-10" />} title={t("services.ecommerce.title")} description={t("services.ecommerce.description")} delay={0.5} onMouseEnter={enterButton} onMouseLeave={leaveLink} />
          </div>
        </div>
      </section>
    </>
  );
});
Services.displayName = "Services";

// Component for service cards
function ServiceCard({ icon, title, description, delay = 0, onMouseEnter, onMouseLeave }: { icon: React.ReactNode; title: string; description: string; delay?: number; onMouseEnter?: () => void; onMouseLeave?: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className=" border border-border rounded-xl hover:border-primary/30 p-6 hover:shadow-lg transition-all"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-white">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  );
}
