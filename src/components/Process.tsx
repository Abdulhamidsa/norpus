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
    <section ref={ref} className="py-24 relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/5 to-background pointer-events-none"></div>
      <div className="absolute w-[500px] h-[500px] -top-64 -right-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute w-[400px] h-[400px] -bottom-32 -left-32 bg-secondary/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-16 md:mb-24">
          <SectionHeading>{t("process.title")}</SectionHeading>
          <p className="text-xl text-muted-foreground max-w-xl mx-auto text-center">{t("process.subtitle")}</p>
        </motion.div>

        {/* Desktop view - horizontal timeline */}
        <div className="hidden md:grid md:grid-cols-5 gap-8 relative mb-8">
          {/* Connection line with animated gradient */}
          <div className="absolute left-0 right-0 top-[72px] h-0.5 bg-gradient-to-r from-transparent via-border to-transparent z-0"></div>
          <div className="absolute left-[10%] right-[10%] top-[72px] h-0.5 z-0">
            <motion.div initial={{ scaleX: 0, originX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }} className="w-full h-full bg-gradient-to-r from-primary/40 to-secondary/40"></motion.div>
          </div>

          <ProcessStepDesktop icon={<ClipboardList />} title={t("process.discovery.title")} description={t("process.discovery.description")} delay={0} step={1} onMouseEnter={enterLink} onMouseLeave={leaveLink} />
          <ProcessStepDesktop icon={<DollarSign />} title={t("process.proposal.title")} description={t("process.proposal.description")} delay={0.15} step={2} onMouseEnter={enterLink} onMouseLeave={leaveLink} />
          <ProcessStepDesktop icon={<Handshake />} title={t("process.planning.title")} description={t("process.planning.description")} delay={0.3} step={3} onMouseEnter={enterLink} onMouseLeave={leaveLink} />
          <ProcessStepDesktop icon={<Code2 />} title={t("process.development.title")} description={t("process.development.description")} delay={0.45} step={4} onMouseEnter={enterLink} onMouseLeave={leaveLink} />
          <ProcessStepDesktop icon={<Rocket />} title={t("process.launch.title")} description={t("process.launch.description")} delay={0.6} step={5} onMouseEnter={enterLink} onMouseLeave={leaveLink} />
        </div>

        {/* Mobile view - vertical timeline */}
        <div className="md:hidden space-y-12 relative">
          {/* Vertical connection line */}
          <div className="absolute left-[24px] top-[35px] bottom-[80px] w-0.5 bg-border/40 z-0"></div>
          <div className="absolute left-[24px] top-[35px] bottom-[80px] w-0.5 z-0">
            <motion.div initial={{ scaleY: 0, originY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ duration: 1.5, ease: "easeOut" }} className="w-full h-full bg-gradient-to-b from-primary/40 to-secondary/40"></motion.div>
          </div>

          <ProcessStepMobile icon={<ClipboardList />} title={t("process.discovery.title")} description={t("process.discovery.description")} delay={0.1} step={1} onMouseEnter={enterLink} onMouseLeave={leaveLink} />
          <ProcessStepMobile icon={<DollarSign />} title={t("process.proposal.title")} description={t("process.proposal.description")} delay={0.2} step={2} onMouseEnter={enterLink} onMouseLeave={leaveLink} />
          <ProcessStepMobile icon={<Handshake />} title={t("process.planning.title")} description={t("process.planning.description")} delay={0.3} step={3} onMouseEnter={enterLink} onMouseLeave={leaveLink} />
          <ProcessStepMobile icon={<Code2 />} title={t("process.development.title")} description={t("process.development.description")} delay={0.4} step={4} onMouseEnter={enterLink} onMouseLeave={leaveLink} />
          <ProcessStepMobile icon={<Rocket />} title={t("process.launch.title")} description={t("process.launch.description")} delay={0.5} step={5} onMouseEnter={enterLink} onMouseLeave={leaveLink} />
        </div>
      </div>
    </section>
  );
});

Process.displayName = "Process";

// Desktop process step component
function ProcessStepDesktop({ icon, title, description, delay = 0, step, onMouseEnter, onMouseLeave }: { icon: React.ReactNode; title: string; description: string; delay?: number; step: number; onMouseEnter?: () => void; onMouseLeave?: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay }} className="flex flex-col h-full items-center text-center relative z-10" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <motion.div className="w-16 h-16 rounded-full bg-background border border-border/40 flex items-center justify-center mb-6 relative shadow-md" whileHover={{ scale: 1.05, boxShadow: "0 8px 24px rgba(0,0,0,0.1)" }} transition={{ type: "spring", stiffness: 300 }}>
        <div className="absolute inset-1 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 blur-sm"></div>
        <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-background text-primary flex items-center justify-center font-semibold text-sm border border-border/40 shadow-sm">{step}</span>
        <div className="text-primary bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full p-3 flex items-center justify-center">
          <div className="h-6 w-6">{icon}</div>
        </div>
      </motion.div>

      <h3 className="text-lg font-medium mb-2 text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-[200px] leading-relaxed">{description}</p>
    </motion.div>
  );
}

// Mobile process step component
function ProcessStepMobile({ icon, title, description, delay = 0, step, onMouseEnter, onMouseLeave }: { icon: React.ReactNode; title: string; description: string; delay?: number; step: number; onMouseEnter?: () => void; onMouseLeave?: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay }} className="flex items-start gap-6 relative z-10" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <div className="flex-shrink-0 mt-1">
        <div className="relative">
          <div className="w-12 h-12 rounded-full bg-background border border-border/40 flex items-center justify-center shadow-md relative">
            <div className="absolute inset-1 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 blur-sm"></div>
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-background text-primary flex items-center justify-center font-semibold text-xs border border-border/40 shadow-sm">{step}</span>
            <div className="text-primary bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full p-2 flex items-center justify-center">
              <div className="h-5 w-5">{icon}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col pt-1">
        <h3 className="text-lg font-medium mb-1 text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}
