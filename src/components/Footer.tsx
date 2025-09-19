import React from "react";
import Link from "next/link";
import { Instagram, Linkedin, Mail } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";

export const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/30">
      <div className="container mx-auto px-6 py-12">
        {/* Main footer content */}
        <div className="flex flex-col items-center text-center mb-10">
          {/* Logo */}
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary p-1 shadow-md animate-pulse">
              <div className="w-full h-full bg-background rounded-full flex items-center justify-center">
                <div className="w-4 h-4 rounded-full border-2 border-secondary"></div>
              </div>
            </div>
            <span className="text-base font-medium">Norpus</span>
          </Link>

          {/* Description - Minimal & centered */}
          <p className="text-sm text-muted-foreground/80 max-w-md mb-8">{t("footer.description")}</p>

          {/* Social Links - Clean horizontal layout */}
          <div className="flex items-center justify-center gap-5 mb-8">
            <a href="mailto:hello@norpus.com" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Email">
              <Mail className="h-4 w-4" />
            </a>
            <a href="https://linkedin.com/company/norpus" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="LinkedIn">
              <Linkedin className="h-4 w-4" />
            </a>
            <a href="https://www.instagram.com/norpusstudio" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Instagram">
              <Instagram className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Footer bottom: Legal & copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-muted-foreground/70">
          <p>© {currentYear} Norpus</p>
          <div className="flex items-center">
            <span className="hidden sm:block mx-2">•</span>
            <Link href="/privacy" className="hover:text-primary transition-colors">
              {t("footer.privacy")}
            </Link>
            <span className="mx-2">•</span>
            <Link href="/terms" className="hover:text-primary transition-colors">
              {t("footer.terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
