import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/use-translation";

export const Clients = () => {
  const { t } = useTranslation();

  return (
    <>
      {/* Client Logos Section */}
      <section className="py-16 bg-accent/5">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">{t("clients.title")}</h2>
            <p className="text-muted-foreground">{t("clients.subtitle")}</p>
          </motion.div>

          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            <ClientLogo name="Company 1" />
            <ClientLogo name="Company 2" />
            <ClientLogo name="Company 3" />
            <ClientLogo name="Company 4" />
            <ClientLogo name="Company 5" />
          </div>
        </div>
      </section>
    </>
  );
};
// Component for client logos
function ClientLogo({ name }: { name: string }) {
  return (
    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="flex items-center justify-center h-16 w-32 grayscale hover:grayscale-0 transition-all">
      <div className="bg-muted/30 rounded-md p-4 w-full h-full flex items-center justify-center">
        <span className="font-medium text-muted-foreground">{name}</span>
      </div>
    </motion.div>
  );
}
