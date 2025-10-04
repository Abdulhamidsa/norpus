"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import { Heart, Users, Target, Globe, Zap, Code, Headphones, Rocket } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import { SectionHeading } from "./ui/section-heading";
import Image from "next/image";

type AboutProps = {
  enterLink?: () => void;
  leaveLink?: () => void;
  enterButton?: () => void;
  leaveButton?: () => void;
};

export const About = forwardRef<HTMLDivElement, AboutProps>(({ enterLink, leaveLink }, ref) => {
  const { t } = useTranslation();

  const values = [
    {
      icon: Zap,
      title: t("about.values.modern.title"),
      description: t("about.values.modern.description"),
    },
    {
      icon: Code,
      title: t("about.values.professional.title"),
      description: t("about.values.professional.description"),
    },
    {
      icon: Headphones,
      title: t("about.values.listening.title"),
      description: t("about.values.listening.description"),
    },
    {
      icon: Target,
      title: t("about.values.goals.title"),
      description: t("about.values.goals.description"),
    },
  ];

  return (
    <section ref={ref} className="min-h-[100dvh] flex flex-col justify-start py-16 md:pt-16 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/5 to-background pointer-events-none"></div>
      <div className="absolute w-[600px] h-[600px] -top-[300px] -right-[300px] bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute w-[500px] h-[500px] -bottom-[250px] -left-[250px] bg-secondary/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <SectionHeading>{t("about.title")}</SectionHeading>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("about.subtitle")}</p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Hero Section with Logo */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Logo/Image Section */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="flex items-center justify-center">
              <div className="relative group">
                {/* Main logo container */}
                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-3xl bg-gradient-to-br from-background/90 to-background/60 backdrop-blur-xl border border-border/20 shadow-2xl shadow-primary/5 flex items-center justify-center overflow-hidden">
                  {/* Subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] via-transparent to-secondary/[0.02]"></div>

                  {/* Logo */}
                  <div className="relative w-40 h-40 md:w-48 md:h-48 z-10">
                    <Image src="/logo.png" alt="Norpus Logo" fill className="object-contain filter drop-shadow-lg" priority />
                  </div>

                  {/* Subtle border glow */}
                  <div className="absolute inset-0 rounded-3xl border border-primary/10 group-hover:border-primary/20 transition-all duration-500"></div>
                </div>

                {/* Floating decorative elements */}
                <div className="absolute -top-6 -right-6 w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 backdrop-blur-sm border border-primary/20 animate-pulse"></div>
                <div className="absolute -bottom-6 -left-6 w-8 h-8 rounded-xl bg-gradient-to-br from-secondary/20 to-secondary/10 backdrop-blur-sm border border-secondary/20 animate-pulse" style={{ animationDelay: "1s" }}></div>

                {/* Background glow effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/5 to-secondary/5 blur-2xl scale-110 opacity-50 group-hover:opacity-75 transition-opacity duration-500 -z-10"></div>
              </div>
            </motion.div>

            {/* Story Section */}
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="flex flex-col justify-center">
              <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-foreground">{t("about.story.title")}</h3>
              <div className="space-y-4 text-muted-foreground">
                <p className="leading-relaxed">{t("about.story.paragraph1")}</p>
                <p className="leading-relaxed">{t("about.story.paragraph2")}</p>
                <p className="leading-relaxed">{t("about.story.paragraph3")}</p>
              </div>
            </motion.div>
          </div>

          {/* Mission & Vision */}
          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-xl p-6 md:p-8 border border-border/50 bg-background/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300"
              onMouseEnter={enterLink}
              onMouseLeave={leaveLink}
            >
              <div className="mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Rocket className="h-6 w-6 text-primary" />
                </div>
                <h4 className="text-xl md:text-2xl font-semibold mb-3">{t("about.mission.title")}</h4>
              </div>
              <p className="text-muted-foreground leading-relaxed">{t("about.mission.description")}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative rounded-xl p-6 md:p-8 border border-border/50 bg-background/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300"
              onMouseEnter={enterLink}
              onMouseLeave={leaveLink}
            >
              <div className="mb-4">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-secondary" />
                </div>
                <h4 className="text-xl md:text-2xl font-semibold mb-3">{t("about.vision.title")}</h4>
              </div>
              <p className="text-muted-foreground leading-relaxed">{t("about.vision.description")}</p>
            </motion.div>
          </div> */}

          {/* Values Section */}
          {/* <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-semibold mb-4">{t("about.values.title")}</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">{t("about.values.subtitle")}</p>
          </motion.div> */}

          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 rounded-xl border border-border/50 bg-background/30 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 group"
                onMouseEnter={enterLink}
                onMouseLeave={leaveLink}
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="h-8 w-8 text-primary" />
                </div>
                <h4 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors duration-300">{value.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div> */}
        </div>
      </div>
    </section>
  );
});

About.displayName = "About";
