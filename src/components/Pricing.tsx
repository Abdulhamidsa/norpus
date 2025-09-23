"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./ui/section-heading";

type ProcessProps = {
  enterLink: () => void;
  leaveLink?: () => void;
  enterButton: () => void;
  leaveButton?: () => void;
};

export const Pricing = forwardRef<HTMLDivElement, ProcessProps>(({ enterLink, leaveLink, enterButton, leaveButton }, ref) => {
  const { t } = useTranslation();

  return (
    <section ref={ref} className="min-h-screen flex flex-col justify-start py-16 md:pt-16 relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/5 to-background pointer-events-none"></div>
      <div className="absolute w-[600px] h-[600px] -top-[300px] -left-[300px] bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute w-[500px] h-[500px] -bottom-[250px] -right-[250px] bg-secondary/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <SectionHeading>{t("pricing.title")}</SectionHeading>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("pricing.subtitle")}</p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Plan */}
            <PricingCard
              title={t("pricing.basic.title")}
              price={39}
              description={t("pricing.basic.description")}
              features={[t("pricing.basic.features.0"), t("pricing.basic.features.1"), t("pricing.basic.features.2"), t("pricing.basic.features.3"), t("pricing.basic.features.4")]}
              cta={t("pricing.basic.cta")}
              delay={0}
              onMouseEnter={enterLink}
              onMouseLeave={leaveLink}
              onButtonEnter={enterButton}
              onButtonLeave={leaveButton}
            />

            {/* Professional Plan */}
            <PricingCard
              title={t("pricing.professional.title")}
              price={69}
              description={t("pricing.professional.description")}
              features={[t("pricing.professional.features.0"), t("pricing.professional.features.1"), t("pricing.professional.features.2"), t("pricing.professional.features.3"), t("pricing.professional.features.4"), t("pricing.professional.features.5")]}
              cta={t("pricing.professional.cta")}
              popular={true}
              delay={0.1}
              onMouseEnter={enterLink}
              onMouseLeave={leaveLink}
              onButtonEnter={enterButton}
              onButtonLeave={leaveButton}
            />
          </div>

          {/* Contact info */}
          <div className="mt-10 text-center text-sm text-muted-foreground">
            <p>
              Need a custom solution?{" "}
              <a href="#contact" className="text-primary hover:underline">
                Contact us
              </a>{" "}
              for enterprise pricing.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});

Pricing.displayName = "Pricing";

function PricingCard({
  title,
  price,
  description,
  features,
  cta,
  popular = false,
  delay = 0,
  onMouseEnter,
  onMouseLeave,
  onButtonEnter,
  onButtonLeave,
}: {
  title: string;
  price: number;
  description: string;
  features: string[];
  cta: string;
  popular?: boolean;
  delay?: number;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onButtonEnter?: () => void;
  onButtonLeave?: () => void;
}) {
  const { language } = useTranslation();
  const formattedPrice = new Intl.NumberFormat(language === "da" ? "da-DK" : "en-US", {
    style: "currency",
    currency: "DKK",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={cn("relative rounded-xl p-6 border transition-all duration-300", "h-full flex flex-col group border-border/50 hover:border-primary/30", popular ? "bg-accent/5" : "bg-background")}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Popular badge */}
      {popular && (
        <div className="absolute -top-3 right-4">
          <div className="bg-primary/90 text-primary-foreground text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1.5">
            <Star className="h-3 w-3 fill-current" />
            {language === "da" ? "Populær" : "Popular"}
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-5">
        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">{title}</h3>
        <div className="mb-3">
          <div className="flex items-end gap-1.5">
            <span className="text-4xl font-bold tracking-tight">{formattedPrice}</span>
            <span className="text-sm text-muted-foreground pb-1">/mo</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      {/* Features */}
      <div className="space-y-3 mb-6 flex-1">
        {features.map((feature, index) => (
          <motion.div key={index} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: delay + index * 0.05 }} className="flex items-start gap-2">
            <div className="flex-shrink-0 w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
              <Check className="h-3 w-3 text-primary" />
            </div>
            <span className="text-sm text-foreground">{feature}</span>
          </motion.div>
        ))}
      </div>

      {/* CTA Button */}
      <div className="mt-auto">
        <a
          href="https://form.norpus.com"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "inline-flex w-full items-center justify-center whitespace-nowrap rounded-md text-sm font-medium",
            "h-10 px-4 transition-all duration-200 gap-1.5",
            popular ? "bg-primary text-primary-foreground hover:opacity-90" : "bg-transparent border border-border hover:border-primary/30"
          )}
          onMouseEnter={onButtonEnter}
          onMouseLeave={onButtonLeave}
        >
          {cta}
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </a>
        <div className="text-xs text-muted-foreground/70 mt-2 text-center">Opens in a new tab</div>
      </div>
    </motion.div>
  );
}
