"use client";

// React hooks
import { useState, useEffect, useRef } from "react";
// UI components and utilities
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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
    aboutRef: React.RefObject<HTMLDivElement>;
    servicesRef: React.RefObject<HTMLDivElement>;
    processRef: React.RefObject<HTMLDivElement>;
    pricingRef: React.RefObject<HTMLDivElement>;
    whyUsRef: React.RefObject<HTMLDivElement>;
    ctaRef: React.RefObject<HTMLDivElement>;
  };
};

export function Navbar({ scrollTo, activeSection, enterButton, enterLink, leaveLink, refs }: NavbarProps) {
  const isMobile = useMobile();
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useTranslation();

  // Debug log to see current active section
  console.log("Current activeSection:", activeSection);

  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Close menu when clicking outside (but not on toggle button)
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node) && toggleRef.current && !toggleRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
      <div className="px-4 md:pl-10 pr-5 py-4 flex items-center justify-between w-full">
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
            <span className="text-xl font-bold">Norpus</span>
          </Link>
        </motion.div>

        {/* Navigation */}
        {isMobile ? (
          <div className="flex items-center gap-4">
            <motion.button
              onClick={() => {
                window.open("https://form.norpus.com/", "_blank");
              }}
              onMouseEnter={enterButton}
              onMouseLeave={leaveLink}
              className="px-5 py-2 text-sm font-medium border border-primary/30 rounded-sm hover:border-primary/30 transition-all duration-200 bg-background/50 backdrop-blur-sm hover:bg-background/80"
            >
              {t("nav.cta")}
            </motion.button>
            <motion.button
              ref={toggleRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => {
                console.log("Button clicked, current menuOpen:", menuOpen);
                setMenuOpen(!menuOpen);
              }}
              className={cn(
                "relative p-3 rounded-2xl transition-all duration-300 group",
                "bg-background/80 backdrop-blur-md",
                "border border-border/30 hover:border-border/50",
                "hover:bg-background/90 hover:scale-105",
                "cursor-pointer z-50",
                menuOpen ? "border-primary/40 bg-primary/5" : ""
              )}
              onMouseEnter={enterButton}
              onMouseLeave={leaveLink}
            >
              <div className="relative w-6 h-6 flex items-center justify-center">
                {/* Creative menu icon */}
                <motion.div className="relative flex items-center justify-center" animate={{ rotate: menuOpen ? 90 : 0 }} transition={{ duration: 0.4, ease: "easeInOut" }}>
                  {/* Four dots */}
                  <motion.div
                    className="absolute w-1.5 h-1.5 bg-current rounded-full"
                    animate={{
                      x: menuOpen ? 0 : -4,
                      y: menuOpen ? 0 : -4,
                      scale: menuOpen ? 0 : 1,
                    }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  />
                  <motion.div
                    className="absolute w-1.5 h-1.5 bg-current rounded-full"
                    animate={{
                      x: menuOpen ? 0 : 4,
                      y: menuOpen ? 0 : -4,
                      scale: menuOpen ? 0 : 1,
                    }}
                    transition={{ duration: 0.3, delay: 0.15 }}
                  />
                  <motion.div
                    className="absolute w-1.5 h-1.5 bg-current rounded-full"
                    animate={{
                      x: menuOpen ? 0 : -4,
                      y: menuOpen ? 0 : 4,
                      scale: menuOpen ? 0 : 1,
                    }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  />
                  <motion.div
                    className="absolute w-1.5 h-1.5 bg-current rounded-full"
                    animate={{
                      x: menuOpen ? 0 : 4,
                      y: menuOpen ? 0 : 4,
                      scale: menuOpen ? 0 : 1,
                    }}
                    transition={{ duration: 0.3, delay: 0.25 }}
                  />

                  {/* X when open */}
                  <motion.div
                    className="absolute w-4 h-0.5 bg-current rounded-full"
                    style={{
                      left: "50%",
                      top: "50%",
                      transformOrigin: "center",
                    }}
                    animate={{
                      rotate: menuOpen ? 45 : 0,
                      scale: menuOpen ? 1 : 0,
                      opacity: menuOpen ? 1 : 0,
                      x: "-50%",
                      y: "-50%",
                    }}
                    transition={{ duration: 0.3, delay: menuOpen ? 0.2 : 0 }}
                  />
                  <motion.div
                    className="absolute w-4 h-0.5 bg-current rounded-full"
                    style={{
                      left: "50%",
                      top: "50%",
                      transformOrigin: "center",
                    }}
                    animate={{
                      rotate: menuOpen ? -45 : 0,
                      scale: menuOpen ? 1 : 0,
                      opacity: menuOpen ? 1 : 0,
                      x: "-50%",
                      y: "-50%",
                    }}
                    transition={{ duration: 0.3, delay: menuOpen ? 0.2 : 0 }}
                  />
                </motion.div>
              </div>
            </motion.button>
          </div>
        ) : (
          <motion.nav initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.1 }} className="flex items-center gap-5">
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
              active={activeSection === "about"}
              onClick={() => {
                scrollTo(refs.aboutRef);
                if (isMobile) setMenuOpen(false);
              }}
              onMouseEnter={enterLink}
              onMouseLeave={leaveLink}
            >
              {t("nav.about")}
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

            <LanguageToggle onMouseEnter={enterButton} onMouseLeave={leaveLink} />

            <motion.button
              onClick={() => {
                window.open("https://form.norpus.com/", "_blank");
              }}
              onMouseEnter={enterButton}
              onMouseLeave={leaveLink}
              className="relative px-4 py-2 text-sm font-medium border border-border/30 rounded-lg hover:border-primary/30 transition-all duration-200 bg-background/50 backdrop-blur-sm hover:bg-background/80"
            >
              {t("nav.cta")}
            </motion.button>
          </motion.nav>
        )}
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed top-[72px] left-0 right-0 z-40 bg-background/100 backdrop-blur-md border-b border-border/30 overflow-hidden shadow-lg"
            ref={menuRef}
          >
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: 0.05 }} className="container mx-auto px-4 py-4 flex flex-col">
              {/* Navigation Items */}
              <div className="flex flex-col divide-y divide-border/10">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: 0.05 }} className={cn("py-4 first:pt-2 last:pb-2")}>
                  <button
                    className={cn(
                      "text-base font-medium text-left flex items-center transition-all duration-200 w-full py-3 px-2 rounded-sm hover:bg-background/50",
                      activeSection === "home" ? "text-primary drop-shadow-[0_0_8px_rgba(59,130,246,0.3)] font-semibold bg-primary/5" : "text-muted-foreground hover:text-foreground"
                    )}
                    onClick={() => {
                      scrollTo(refs.heroRef);
                      setMenuOpen(false);
                    }}
                  >
                    <span className="relative pl-3">
                      {t("nav.home")}
                      {activeSection === "home" && <motion.div layoutId="mobileActiveIndicator" className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-6 rounded-full bg-primary shadow-[0_0_6px_rgba(59,130,246,0.5)]" />}
                    </span>
                  </button>
                </motion.div>

                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: 0.1 }} className={cn("py-4 first:pt-2 last:pb-2")}>
                  <button
                    className={cn(
                      "text-base font-medium text-left flex items-center transition-all duration-200 w-full py-3 px-2 rounded-sm hover:bg-background/50",
                      activeSection === "about" ? "text-primary drop-shadow-[0_0_8px_rgba(59,130,246,0.3)] font-semibold bg-primary/5" : "text-muted-foreground hover:text-foreground"
                    )}
                    onClick={() => {
                      scrollTo(refs.aboutRef);
                      setMenuOpen(false);
                    }}
                  >
                    <span className="relative pl-3">
                      {t("nav.about")}
                      {activeSection === "about" && <motion.div layoutId="mobileActiveIndicator" className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-6 rounded-full bg-primary shadow-[0_0_6px_rgba(59,130,246,0.5)]" />}
                    </span>
                  </button>
                </motion.div>

                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: 0.15 }} className={cn("py-4 first:pt-2 last:pb-2")}>
                  <button
                    className={cn(
                      "text-base font-medium text-left flex items-center transition-all duration-200 w-full py-3 px-2 rounded-sm hover:bg-background/50",
                      activeSection === "services" ? "text-primary drop-shadow-[0_0_8px_rgba(59,130,246,0.3)] font-semibold bg-primary/5" : "text-muted-foreground hover:text-foreground"
                    )}
                    onClick={() => {
                      scrollTo(refs.servicesRef);
                      setMenuOpen(false);
                    }}
                  >
                    <span className="relative pl-3">
                      {t("nav.services")}
                      {activeSection === "services" && <motion.div layoutId="mobileActiveIndicator" className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-6 rounded-full bg-primary shadow-[0_0_6px_rgba(59,130,246,0.5)]" />}
                    </span>
                  </button>
                </motion.div>

                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: 0.2 }} className={cn("py-4 first:pt-2 last:pb-2")}>
                  <button
                    className={cn(
                      "text-base font-medium text-left flex items-center transition-all duration-200 w-full py-3 px-2 rounded-sm hover:bg-background/50",
                      activeSection === "process" ? "text-primary drop-shadow-[0_0_8px_rgba(59,130,246,0.3)] font-semibold bg-primary/5" : "text-muted-foreground hover:text-foreground"
                    )}
                    onClick={() => {
                      scrollTo(refs.processRef);
                      setMenuOpen(false);
                    }}
                  >
                    <span className="relative pl-3">
                      {t("nav.process")}
                      {activeSection === "process" && <motion.div layoutId="mobileActiveIndicator" className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-6 rounded-full bg-primary shadow-[0_0_6px_rgba(59,130,246,0.5)]" />}
                    </span>
                  </button>
                </motion.div>

                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: 0.25 }} className={cn("py-4 first:pt-2 last:pb-2")}>
                  <button
                    className={cn(
                      "text-base font-medium text-left flex items-center transition-all duration-200 w-full py-3 px-2 rounded-sm hover:bg-background/50",
                      activeSection === "pricing" ? "text-primary drop-shadow-[0_0_8px_rgba(59,130,246,0.3)] font-semibold bg-primary/5" : "text-muted-foreground hover:text-foreground"
                    )}
                    onClick={() => {
                      scrollTo(refs.pricingRef);
                      setMenuOpen(false);
                    }}
                  >
                    <span className="relative pl-3">
                      {t("nav.pricing")}
                      {activeSection === "pricing" && <motion.div layoutId="mobileActiveIndicator" className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-6 rounded-full bg-primary shadow-[0_0_6px_rgba(59,130,246,0.5)]" />}
                    </span>
                  </button>
                </motion.div>

                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: 0.3 }} className={cn("py-4 first:pt-2 last:pb-2")}>
                  <button
                    className={cn(
                      "text-base font-medium text-left flex items-center transition-all duration-200 w-full py-3 px-2 rounded-sm hover:bg-background/50",
                      activeSection === "whyus" ? "text-primary drop-shadow-[0_0_8px_rgba(59,130,246,0.3)] font-semibold bg-primary/5" : "text-muted-foreground hover:text-foreground"
                    )}
                    onClick={() => {
                      scrollTo(refs.whyUsRef);
                      setMenuOpen(false);
                    }}
                  >
                    <span className="relative pl-3">
                      {t("nav.whyus")}
                      {activeSection === "whyus" && <motion.div layoutId="mobileActiveIndicator" className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-6 rounded-full bg-primary shadow-[0_0_6px_rgba(59,130,246,0.5)]" />}
                    </span>
                  </button>
                </motion.div>
              </div>

              {/* Language Toggle */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.3 }} className="mt-4 pt-4 border-t border-border/10">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Language</span>
                  <LanguageToggle onMouseEnter={enterButton} onMouseLeave={leaveLink} />
                </div>
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
    <motion.button
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={cn(
        "relative text-sm font-medium transition-all duration-200 hover:text-foreground cursor-pointer px-3 py-2 rounded-md hover:bg-background/30",
        active ? "text-foreground drop-shadow-[0_0_8px_rgba(59,130,246,0.3)] font-semibold" : "text-muted-foreground",
        className
      )}
    >
      {children}
      {active && !className && <motion.div layoutId="underline" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full shadow-[0_0_6px_rgba(59,130,246,0.5)]" transition={{ type: "spring", stiffness: 300, damping: 30 }} />}
    </motion.button>
  );
}
