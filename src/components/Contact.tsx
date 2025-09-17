import { motion } from "framer-motion";
import { Globe, Mail, Clock } from "lucide-react";
import React, { forwardRef } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useTranslation } from "@/hooks/use-translation";
import { SectionHeading } from "./ui/section-heading";

type ContactProps = {
  leaveLink: () => void;
  enterButton: () => void;
};

export const Contact = forwardRef<HTMLDivElement, ContactProps>(({ leaveLink, enterButton }, ref) => {
  const { t } = useTranslation();
  return (
    <>
      {/* Contact Section */}
      <section ref={ref} className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <SectionHeading>{t("contact.title")}</SectionHeading>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t("contact.subtitle")}</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="bg-background border border-border/40 rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-6">{t("contact.info.title")}</h3>
              <p className="text-muted-foreground mb-8">{t("contact.info.subtitle")}</p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Globe className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-lg">{t("contact.info.location.title")}</h4>
                    <p className="text-muted-foreground">{t("contact.info.location.address")}</p>
                    <p className="text-muted-foreground mt-1">{t("contact.info.location.country")}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-lg">{t("contact.info.email.title")}</h4>
                    <p className="text-muted-foreground">hello@norpus.com</p>
                    {/* <p className="text-muted-foreground mt-1">support@norpus.com</p> */}
                  </div>
                </div>

                {/* <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-lg">{t("contact.info.phone.title")}</h4>
                    <p className="text-muted-foreground">+45 12 34 56 78</p>
                    <a href="https://wa.me/4512345678" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-2 text-primary hover:underline">
                      <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      {t("contact.info.phone.whatsapp")}
                    </a>
                  </div>
                </div> */}

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-lg">{t("contact.info.hours.title")}</h4>
                    <p className="text-muted-foreground">{t("contact.info.hours.weekdays")}</p>
                    <p className="text-muted-foreground mt-1">{t("contact.info.hours.weekend")}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="bg-background border border-border/40 rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-6">{t("contact.form.title")}</h3>
              <p className="text-muted-foreground mb-8">{t("contact.form.subtitle")}</p>

              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      {t("contact.form.name.label")}
                    </label>
                    <Input id="name" placeholder={t("contact.form.name.placeholder")} onMouseEnter={enterButton} onMouseLeave={leaveLink} />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      {t("contact.form.email.label")}
                    </label>
                    <Input id="email" type="email" placeholder={t("contact.form.email.placeholder")} onMouseEnter={enterButton} onMouseLeave={leaveLink} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    {t("contact.form.subject.label")}
                  </label>
                  <Input id="subject" placeholder={t("contact.form.subject.placeholder")} onMouseEnter={enterButton} onMouseLeave={leaveLink} />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    {t("contact.form.message.label")}
                  </label>
                  <Textarea id="message" placeholder={t("contact.form.message.placeholder")} rows={5} onMouseEnter={enterButton} onMouseLeave={leaveLink} />
                </div>

                <Button variant="gradient" size="lg" className="w-full" onMouseEnter={enterButton} onMouseLeave={leaveLink}>
                  {t("contact.form.submit")}
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
});
Contact.displayName = "Contact";
