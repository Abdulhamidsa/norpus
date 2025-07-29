import { useTranslation } from "@/hooks/use-translation";
import { motion } from "framer-motion";
import { ClipboardList, DollarSign, Handshake, Code2, Rocket } from "lucide-react";
import React, { forwardRef } from "react";
import { SectionHeading } from "./ui/section-heading";

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
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-16">
            <SectionHeading>{t("process.title")}</SectionHeading>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-center">{t("process.subtitle")}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative items-stretch">
            {/* Minimal connection line, visually centered */}
            <div className="hidden md:block absolute left-0 right-0 top-1/2 transform -translate-y-1/2 h-0.5 bg-border z-0" />

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
    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay }} className="flex flex-col h-full items-center text-center relative z-10" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <motion.div className="w-20 h-20 rounded-full bg-transparent backdrop-blur-md border border-border flex items-center justify-center mb-6 relative shadow-sm transition-all duration-300 self-center" whileHover={{ scale: 1.08, boxShadow: "0 2px 12px 0 rgba(0,0,0,0.08)" }}>
        <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-background text-primary text-base flex items-center justify-center font-bold border border-border shadow-sm">{step}</span>
        <div className="text-white bg-gradient-to-br from-primary to-secondary rounded-full p-3 flex items-center justify-center">{icon}</div>
      </motion.div>
      <h3 className="text-xl font-bold mb-2 text-foreground w-full">{title}</h3>
      <p className="text-muted-foreground max-w-xs w-full">{description}</p>
    </motion.div>
  );
}
