import React from "react";
import { useTranslation } from "@/hooks/use-translation";
import Link from "next/link";
import { Instagram, Linkedin, Mail } from "lucide-react";

export const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <>
      {/* Footer */}
      <footer className="py-12 border-t bg-background/80">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Company Info */}
            <div>
              <Link href="/" className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary p-1 shadow-md">
                  <div className="w-full h-full bg-background rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full border-2 border-secondary"></div>
                  </div>
                </div>
                <span className="text-xl font-bold">Norpus</span>
              </Link>
              <p className="text-sm text-muted-foreground mb-4">{t("footer.description") || "Creating beautiful, functional digital experiences tailored to your needs."}</p>
              <p className="text-sm text-muted-foreground">{t("footer.location")}</p>
            </div>

            {/* Links */}
            <div>
              <h3 className="font-bold mb-4">{t("footer.links") || "Quick Links"}</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/#services" className="text-muted-foreground hover:text-primary transition-colors">
                    {t("nav.services")}
                  </Link>
                </li>
                <li>
                  <Link href="/#process" className="text-muted-foreground hover:text-primary transition-colors">
                    {t("nav.process")}
                  </Link>
                </li>
                <li>
                  <Link href="/#pricing" className="text-muted-foreground hover:text-primary transition-colors">
                    {t("nav.pricing")}
                  </Link>
                </li>
                <li>
                  <Link href="/#contact" className="text-muted-foreground hover:text-primary transition-colors">
                    {t("nav.contact")}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact & Social */}
            <div>
              <h3 className="font-bold mb-4">{t("footer.contact") || "Get in Touch"}</h3>
              <div className="flex items-center gap-2 text-sm mb-4">
                <Mail className="h-4 w-4" />
                <a href="mailto:hello@norpus.com" className="text-muted-foreground hover:text-primary transition-colors">
                  hello@norpus.com
                </a>
              </div>

              <div className="flex items-center gap-4 mt-4">
                <a href="https://linkedin.com/company/norpus" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-primary/20 transition-colors" aria-label="LinkedIn">
                  <Linkedin className="h-4 w-4" />
                </a>
                <a href="https://instagram.com/norpus" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-primary/20 transition-colors" aria-label="Instagram">
                  <Instagram className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-muted-foreground mb-2 md:mb-0">
              © {currentYear} Norpus. {t("footer.rights")}
            </p>

            <div className="flex gap-4 text-xs">
              <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                {t("footer.privacy") || "Privacy Policy"}
              </Link>
              <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                {t("footer.terms") || "Terms of Service"}
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
