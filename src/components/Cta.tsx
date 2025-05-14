import { motion } from "framer-motion";
import React, { forwardRef } from "react";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

type ProcessProps = {
  enterLink: () => void;
  leaveLink?: () => void;
  enterButton: () => void;
  leaveButton?: () => void;
};
import { useTranslation } from "@/hooks/use-translation";

export const Cta = forwardRef<HTMLDivElement, ProcessProps>(({ leaveLink, enterButton }) => {
  const { t } = useTranslation();
  return (
    <>
      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 z-0">
              <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full filter blur-3xl"></div>
              <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-pink-500/20 rounded-full filter blur-3xl"></div>
            </div>

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("cta.title")}</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">{t("cta.subtitle")}</p>
              <Button
                size="lg"
                className="group text-lg px-8 py-6 cursor-pointer"
                onMouseEnter={enterButton}
                onMouseLeave={leaveLink}
                onClick={() => {
                  window.open("https://form-subbmition.vercel.app/", "_blank");
                }}
              >
                {t("cta.button")}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
});
Cta.displayName = "Cta";
