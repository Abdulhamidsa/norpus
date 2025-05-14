"use client";

import { useTranslation } from "@/hooks/use-translation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import React, { forwardRef } from "react";

type ProcessProps = {
  enterLink: () => void;
  leaveLink?: () => void;
  enterButton: () => void;
  leaveButton?: () => void;
};

export const Pricing = forwardRef<HTMLDivElement, ProcessProps>(({ enterLink, leaveLink, enterButton }, ref) => {
  const { t } = useTranslation();

  return (
    <section ref={ref} className="py-20">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">{t("pricing.title")}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t("pricing.subtitle")}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
            onButtonLeave={leaveLink}
          />

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
            onButtonLeave={leaveLink}
          />

          <PricingCard
            title={t("pricing.enterprise.title")}
            price={4999}
            description={t("pricing.enterprise.description")}
            features={[t("pricing.enterprise.features.0"), t("pricing.enterprise.features.1"), t("pricing.enterprise.features.2"), t("pricing.enterprise.features.3"), t("pricing.enterprise.features.4"), t("pricing.enterprise.features.5")]}
            cta={t("pricing.enterprise.cta")}
            delay={0.2}
            onMouseEnter={enterLink}
            onMouseLeave={leaveLink}
            onButtonEnter={enterButton}
            onButtonLeave={leaveLink}
          />
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
  //   cta,
  popular = false,
  delay = 0,
  onMouseEnter,
  onMouseLeave,
}: //   onButtonEnter,
//   onButtonLeave,
{
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
      className={cn("relative rounded-xl p-6 border transition-all h-full flex flex-col", popular ? "border-primary/50 bg-primary/5 shadow-lg shadow-primary/10" : "border-border bg-card hover:shadow-md")}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {popular && (
        <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
          <div className="bg-primary text-purple-800 text-xs font-bold px-3 py-1 rounded-full">{language === "da" ? "Populær" : "Popular"}</div>
        </div>
      )}

      <div className="text-center mb-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <div className="flex items-end justify-center gap-1 mb-2">
          <span className="text-4xl font-bold">{formattedPrice}</span>
          <span className="text-sm text-muted-foreground">/måned</span>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      <div className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start gap-2">
            <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <span className="text-sm">{feature}</span>
          </div>
        ))}
      </div>

      {/* <div className="mt-auto pt-6">
        <Button className={cn("w-full", popular ? "bg-primary hover:bg-primary/90" : "")} variant={popular ? "default" : "outline"} onMouseEnter={onButtonEnter} onMouseLeave={onButtonLeave}>
          {cta}
        </Button>
      </div> */}
    </motion.div>
  );
}
