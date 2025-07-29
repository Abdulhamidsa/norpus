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
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="flex items-center gap-2">
          <Link
            href="/"
            className="flex items-center gap-3"
            onClick={() => {
              if (isMobile) setMenuOpen(false);
            }}
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary p-1 shadow-md animate-pulse">
              <div className="w-full h-full bg-background rounded-full flex items-center justify-center">
                <div className="w-4 h-4 rounded-full border-2 border-secondary"></div>
              </div>
            </div>
            {/* <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">Norpus Studio</span> */}
            <span className="text-xl font-bold">Norpus</span>
          </Link>
        </motion.div>

        {/* Navigation */}
        {isMobile ? (
          <div className="flex items-center gap-4">
            <LanguageToggle onMouseEnter={enterButton} onMouseLeave={leaveLink} />
            <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={() => setMenuOpen(!menuOpen)} className="p-2 rounded-md hover:bg-accent" onMouseEnter={enterButton} onMouseLeave={leaveLink}>
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        ) : (
          <motion.nav initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.1 }} className="flex items-center gap-8">
            <NavLink active={activeSection === "home"} onClick={() => scrollTo(refs.heroRef)} onMouseEnter={enterLink} onMouseLeave={leaveLink}>
              {t("nav.home")}
            </NavLink>
            <NavLink active={activeSection === "services"} onClick={() => scrollTo(refs.servicesRef)} onMouseEnter={enterLink} onMouseLeave={leaveLink}>
              {t("nav.services")}
            </NavLink>
            <NavLink active={activeSection === "process"} onClick={() => scrollTo(refs.processRef)} onMouseEnter={enterLink} onMouseLeave={leaveLink}>
              {t("nav.process")}
            </NavLink>
            <NavLink active={activeSection === "pricing"} onClick={() => scrollTo(refs.pricingRef)} onMouseEnter={enterLink} onMouseLeave={leaveLink}>
              {t("nav.pricing")}
            </NavLink>
            <NavLink active={activeSection === "whyus"} onClick={() => scrollTo(refs.whyUsRef)} onMouseEnter={enterLink} onMouseLeave={leaveLink}>
              {t("nav.whyus")}
            </NavLink>
            <NavLink active={activeSection === "contact"} onClick={() => scrollTo(refs.contactRef)} onMouseEnter={enterLink} onMouseLeave={leaveLink}>
              {t("nav.contact")}
            </NavLink>
            <LanguageToggle onMouseEnter={enterButton} onMouseLeave={leaveLink} />
          </motion.nav>
        )}
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed top-[72px] left-0 right-0 z-40 bg-background border-b border-border overflow-hidden">
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {navKeys.map(({ key, ref }) => (
                <NavLink key={key} active={activeSection === key} onClick={() => scrollTo(refs[ref as keyof typeof refs])}>
                  {t(`nav.${key}`)}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function NavLink({ children, active = false, onClick, onMouseEnter, onMouseLeave }: { children: React.ReactNode; active?: boolean; onClick?: () => void; onMouseEnter?: () => void; onMouseLeave?: () => void }) {
  return (
    <motion.button onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className={cn("relative text-sm font-medium transition-colors hover:text-foreground cursor-pointer", active ? "text-foreground" : "text-muted-foreground")}>
      {children}
      {active && <motion.div layoutId="activeNavIndicator" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />}
    </motion.button>
  );
}
