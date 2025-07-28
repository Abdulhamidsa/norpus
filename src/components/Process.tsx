import { useTranslation } from "@/hooks/use-translation";
import { motion } from "framer-motion";
import { ClipboardList, DollarSign, Handshake, Code2, Rocket } from "lucide-react";
import React, { forwardRef } from "react";

type ProcessProps = {
  enterLink?: () => void;
  leaveLink?: () => void;
};

export const Process = forwardRef<HTMLDivElement, ProcessProps>(({ enterLink, leaveLink }, ref) => {
  const { t } = useTranslation();

  return (
    <>
      {/* Process Section */}
      <section ref={ref} className="py-20 bg-gradient-to-b from-background to-accent/5">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">{t("process.title")}</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t("process.subtitle")}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
            {/* Connection lines for desktop */}
            <div className="hidden md:block absolute top-1/4 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-primary z-0"></div>

            <ProcessStep icon={<ClipboardList className="h-8 w-8" />} title={t("process.discovery.title")} description={t("process.discovery.description")} delay={0} step={1} onMouseEnter={enterLink} onMouseLeave={leaveLink} />

            <ProcessStep icon={<DollarSign className="h-8 w-8" />} title={t("process.proposal.title")} description={t("process.proposal.description")} delay={0.1} step={2} onMouseEnter={enterLink} onMouseLeave={leaveLink} />

            <ProcessStep icon={<Handshake className="h-8 w-8" />} title={t("process.planning.title")} description={t("process.planning.description")} delay={0.2} step={3} onMouseEnter={enterLink} onMouseLeave={leaveLink} />

            <ProcessStep icon={<Code2 className="h-8 w-8" />} title={t("process.development.title")} description={t("process.development.description")} delay={0.3} step={4} onMouseEnter={enterLink} onMouseLeave={leaveLink} />

            <ProcessStep icon={<Rocket className="h-8 w-8" />} title={t("process.launch.title")} description={t("process.launch.description")} delay={0.4} step={5} onMouseEnter={enterLink} onMouseLeave={leaveLink} />
          </div>
        </div>
      </section>
    </>
  );
});

Process.displayName = "Process";

// Component for process steps
function ProcessStep({ icon, title, description, delay = 0, step, onMouseEnter, onMouseLeave }: { icon: React.ReactNode; title: string; description: string; delay?: number; step: number; onMouseEnter?: () => void; onMouseLeave?: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay }} className="flex flex-col items-center text-center relative z-10" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <motion.div className="w-20 h-20 rounded-full bg-card border-4 border-primary flex items-center justify-center mb-6 relative" whileHover={{ scale: 1.1, boxShadow: "0 0 25px rgba(139, 92, 246, 0.5)" }}>
        <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-white text-sm flex items-center justify-center font-bold">{step}</span>
        <div className="text-primary">{icon}</div>
      </motion.div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground max-w-xs">{description}</p>
    </motion.div>
  );
}
