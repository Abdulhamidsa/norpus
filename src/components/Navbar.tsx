"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMobile } from "@/hooks/use-mobile";
import { LanguageToggle } from "@/components/language-toggle";
import { useTranslation } from "@/hooks/use-translation";
import Link from "next/link";

type NavbarProps = {
  scrollTo: (ref: React.RefObject<HTMLDivElement>) => void;
  activeSection: string;
  enterButton: () => void;
  enterLink: () => void;
  leaveLink: () => void;
  refs: {
    heroRef: React.RefObject<HTMLDivElement>;
    servicesRef: React.RefObject<HTMLDivElement>;
    processRef: React.RefObject<HTMLDivElement>;
    pricingRef: React.RefObject<HTMLDivElement>;
    whyUsRef: React.RefObject<HTMLDivElement>;
    contactRef: React.RefObject<HTMLDivElement>;
  };
};
const navKeys = [
  { key: "home", ref: "heroRef" },
  { key: "services", ref: "servicesRef" },
  { key: "process", ref: "processRef" },
  { key: "pricing", ref: "pricingRef" },
  { key: "whyus", ref: "whyUsRef" },
  { key: "contact", ref: "contactRef" },
];

export function Navbar({ scrollTo, activeSection, enterButton, enterLink, leaveLink, refs }: NavbarProps) {
  const isMobile = useMobile();
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-lg border-b border-border/30 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="flex items-center gap-2">
          <Link
            href="/"
            className="flex items-center gap-2.5"
            onClick={() => {
              if (isMobile) setMenuOpen(false);
            }}
          >
            <div className="relative w-8 h-8 rounded-md bg-gradient-to-r from-primary to-primary/80 shadow-sm flex items-center justify-center">
              <span className="text-primary-foreground text-lg font-bold">N</span>
            </div>
            <span className="text-lg font-semibold tracking-tight">Norpus</span>
          </Link>
        </motion.div>

        {/* Navigation */}
        {isMobile ? (
          <div className="flex items-center gap-3">
            <LanguageToggle onMouseEnter={enterButton} onMouseLeave={leaveLink} />
            <button onClick={() => setMenuOpen(!menuOpen)} className={cn("p-1.5 rounded border border-border/30 transition-all duration-200", menuOpen ? "bg-primary/10 text-primary" : "hover:border-primary/30")} onMouseEnter={enterButton} onMouseLeave={leaveLink}>
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        ) : (
          <motion.nav initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.1 }} className="flex items-center gap-6">
            {navKeys.map(({ key, ref }) => (
              <NavLink key={key} active={activeSection === key} onClick={() => scrollTo(refs[ref as keyof typeof refs])} onMouseEnter={enterLink} onMouseLeave={leaveLink}>
                {t(`nav.${key}`)}
              </NavLink>
            ))}
            <div className="border-l border-border/30 h-5 mx-1"></div>
            <LanguageToggle onMouseEnter={enterButton} onMouseLeave={leaveLink} />
          </motion.nav>
        )}
      </div>

      {/* Mobile Menu - Enhanced Design */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-[72px] left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-b border-border/30 overflow-hidden shadow-lg"
          >
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1, staggerChildren: 0.05 }} className="container mx-auto px-4 py-6 flex flex-col">
              {navKeys.map(({ key, ref }, index) => (
                <motion.div key={key} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.2, delay: 0.1 + index * 0.05 }}>
                  <button
                    className={cn("w-full text-left py-3 border-b border-border/10 flex items-center justify-between", activeSection === key ? "text-primary font-medium" : "text-muted-foreground")}
                    onClick={() => {
                      scrollTo(refs[ref as keyof typeof refs]);
                      setMenuOpen(false);
                    }}
                  >
                    <span className="text-base">{t(`nav.${key}`)}</span>
                    {activeSection === key && <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>}
                  </button>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function NavLink({ children, active = false, onClick, onMouseEnter, onMouseLeave }: { children: React.ReactNode; active?: boolean; onClick?: () => void; onMouseEnter?: () => void; onMouseLeave?: () => void }) {
  return (
    <button onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className={cn("relative py-1.5 px-1 text-sm transition-colors cursor-pointer group", active ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground")}>
      {/* Static content */}
      <span className="relative z-10">{children}</span>

      {/* Better indicator - no layoutId animation to avoid lag */}
      <div className={cn("absolute bottom-0 left-0 w-full h-[2px] transition-transform duration-200", active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100")}>
        <div className="w-full h-full bg-primary/80"></div>
      </div>
    </button>
  );
}
