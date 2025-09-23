"use client";

// React hooks
import { useState } from "react";
// UI components and utilities
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { LanguageToggle } from "@/components/language-toggle";
import { useMobile } from "@/hooks/use-mobile";
import { useTranslation } from "@/hooks/use-translation";
import { cn } from "@/lib/utils";

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
    ctaRef: React.RefObject<HTMLDivElement>;
  };
};
const navKeys = [
  { key: "home", ref: "heroRef" },
  { key: "services", ref: "servicesRef" },
  { key: "process", ref: "processRef" },
  { key: "pricing", ref: "pricingRef" },
  { key: "whyus", ref: "whyUsRef" },
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
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => setMenuOpen(!menuOpen)}
              className={cn("relative p-2.5 rounded-lg border border-border/30 transition-all duration-200", "bg-background/80 backdrop-blur-sm shadow-sm", menuOpen ? "border-primary/40 text-primary" : "hover:border-primary/20 hover:bg-background/90")}
              onMouseEnter={enterButton}
              onMouseLeave={leaveLink}
            >
              <div className="relative">
                <motion.span className="absolute inset-0 flex items-center justify-center" animate={{ opacity: menuOpen ? 1 : 0 }} transition={{ duration: 0.2 }}>
                  <X size={20} strokeWidth={2.5} />
                </motion.span>
                <motion.span className="flex items-center justify-center" animate={{ opacity: menuOpen ? 0 : 1 }} transition={{ duration: 0.2 }}>
                  <Menu size={20} strokeWidth={2.5} />
                </motion.span>
              </div>
            </motion.button>
          </div>
        ) : (
          <motion.nav initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.1 }} className="flex items-center gap-8">
            <NavLink
              active={activeSection === "home"}
              onClick={() => {
                scrollTo(refs.heroRef);
                if (isMobile) setMenuOpen(false);
              }}
              onMouseEnter={enterLink}
              onMouseLeave={leaveLink}
            >
              {t("nav.home")}
            </NavLink>
            <NavLink
              active={activeSection === "services"}
              onClick={() => {
                scrollTo(refs.servicesRef);
                if (isMobile) setMenuOpen(false);
              }}
              onMouseEnter={enterLink}
              onMouseLeave={leaveLink}
            >
              {t("nav.services")}
            </NavLink>
            <NavLink
              active={activeSection === "process"}
              onClick={() => {
                scrollTo(refs.processRef);
                if (isMobile) setMenuOpen(false);
              }}
              onMouseEnter={enterLink}
              onMouseLeave={leaveLink}
            >
              {t("nav.process")}
            </NavLink>
            <NavLink
              active={activeSection === "pricing"}
              onClick={() => {
                scrollTo(refs.pricingRef);
                if (isMobile) setMenuOpen(false);
              }}
              onMouseEnter={enterLink}
              onMouseLeave={leaveLink}
            >
              {t("nav.pricing")}
            </NavLink>
            <NavLink
              active={activeSection === "whyus"}
              onClick={() => {
                scrollTo(refs.whyUsRef);
                if (isMobile) setMenuOpen(false);
              }}
              onMouseEnter={enterLink}
              onMouseLeave={leaveLink}
            >
              {t("nav.whyus")}
            </NavLink>
            <NavLink
              active={activeSection === "cta"}
              onClick={() => {
                scrollTo(refs.ctaRef);
                if (isMobile) setMenuOpen(false);
              }}
              onMouseEnter={enterLink}
              onMouseLeave={leaveLink}
              className="bg-primary/10 text-primary border border-primary/20 px-4 py-2 rounded-md hover:bg-primary/20 transition-all duration-200"
            >
              {t("nav.cta")}
            </NavLink>
            {/* <NavLink
              active={activeSection === "contact"}
              onClick={() => {
                scrollTo(refs.contactRef);
                if (isMobile) setMenuOpen(false);
              }}
              onMouseEnter={enterLink}
              onMouseLeave={leaveLink}
            >
              {t("nav.contact")}
            </NavLink> */}
            <LanguageToggle onMouseEnter={enterButton} onMouseLeave={leaveLink} />
          </motion.nav>
        )}
      </div>

      {/* Mobile Menu - Redesigned for cleaner minimal look */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed top-[72px] left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-b border-border/30 overflow-hidden shadow-lg"
          >
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: 0.05, staggerChildren: 0.07 }} className="container mx-auto px-4 py-6 flex flex-col">
              {/* Navigation Items */}
              <div className="flex flex-col divide-y divide-border/10">
                {navKeys.map(({ key, ref }, index) => (
                  <motion.div key={key} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: 0.05 + index * 0.05 }} className={cn("py-4 first:pt-2 last:pb-2", "flex items-center justify-between")}>
                    <button
                      className={cn("text-base font-medium text-left flex items-center transition-colors duration-200 w-fit", activeSection === key ? "text-primary" : "text-muted-foreground hover:text-foreground")}
                      onClick={() => {
                        scrollTo(refs[ref as keyof typeof refs]);
                        setMenuOpen(false); // Close the menu when clicking a link
                      }}
                    >
                      <span className="relative">
                        {t(`nav.${key}`)}
                        {activeSection === key && <motion.div layoutId="mobileActiveIndicator" className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary" />}
                      </span>
                    </button>
                    <motion.div
                      animate={{ rotate: activeSection === key ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                      className={cn("w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-200", activeSection === key ? "text-primary" : "text-muted-foreground/50")}
                    >
                      {activeSection === key ? (
                        <span className="text-xs font-medium">→</span>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path d="M9 5l7 7-7 7" />
                        </svg>
                      )}
                    </motion.div>
                  </motion.div>
                ))}
              </div>

              {/* CTA Button - Separate from nav items */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.4 }} className="mt-6 pt-4 border-t border-border/10">
                <button
                  className="w-full bg-primary text-primary-foreground px-4 py-3 rounded-md hover:opacity-90 transition-all duration-200 font-medium text-center"
                  onClick={() => {
                    scrollTo(refs.ctaRef);
                    setMenuOpen(false);
                  }}
                >
                  {t("nav.cta")}
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function NavLink({ children, active = false, onClick, onMouseEnter, onMouseLeave, className }: { children: React.ReactNode; active?: boolean; onClick?: () => void; onMouseEnter?: () => void; onMouseLeave?: () => void; className?: string }) {
  return (
    <motion.button onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className={cn("relative text-sm font-medium transition-colors hover:text-foreground cursor-pointer", active ? "text-foreground" : "text-muted-foreground", className)}>
      {children}
      {active && !className && <motion.div layoutId="activeNavIndicator" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />}
    </motion.button>
  );
}
