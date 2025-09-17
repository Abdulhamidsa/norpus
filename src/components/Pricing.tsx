"use client";

import { useTranslation } from "@/hooks/use-translation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import { forwardRef } from "react";
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
    <section ref={ref} className="py-20">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <SectionHeading>{t("pricing.title")}</SectionHeading>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t("pricing.subtitle")}</p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
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

          {/* Bottom accent line */}
          <motion.div initial={{ opacity: 0, scaleX: 0 }} whileInView={{ opacity: 1, scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.4 }} className="mt-16">
            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          </motion.div>
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
      className={cn("relative rounded-3xl p-8 border transition-all duration-300 h-full flex flex-col group border-border/50 hover:border-border hover:shadow-lg")}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Popular badge */}
      {popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-primary text-primary-foreground text-sm font-semibold px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
            <Star className="h-4 w-4 fill-current" />
            {language === "da" ? "Mest Populær" : "Most Popular"}
          </div>
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">{title}</h3>
        <div className="mb-4">
          <div className="flex items-end justify-center gap-2 mb-2">
            <span className="text-5xl font-bold tracking-tight">{formattedPrice}</span>
            <span className="text-lg text-muted-foreground pb-2">/monthly</span>
          </div>
        </div>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>

      {/* Features */}
      <div className="space-y-4 mb-8 flex-1">
        {features.map((feature, index) => (
          <motion.div key={index} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: delay + index * 0.05 }} className="flex items-start gap-3">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
              <Check className="h-4 w-4 text-primary" />
            </div>
            <span className="text-foreground leading-relaxed">{feature}</span>
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
            "inline-flex w-full items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium",
            "h-11 px-6 transition-all duration-200 gap-2",
            popular ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90" : "bg-transparent border border-border hover:bg-accent/50"
          )}
          onMouseEnter={onButtonEnter}
          onMouseLeave={onButtonLeave}
        >
          {cta}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </a>
        <div className="text-xs text-muted-foreground mt-2 text-center">Opens a secure form in a new tab.</div>
      </div>

      {/* Subtle hover effect */}
      <div className={cn("absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-br from-accent/5 to-background/5")} />
    </motion.div>
  );
}
