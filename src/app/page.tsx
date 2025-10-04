"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import { About } from "@/components/About";
import { Cta } from "@/components/Cta";
import CustomCursor from "@/components/custom-cursor";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Pricing } from "@/components/Pricing";
import { Process } from "@/components/Process";
import { Services } from "@/components/Services";
import { WhyUs } from "@/components/Whyus";
import { SectionSeparator } from "@/components/ui/section-separator";
import { useMobile } from "@/hooks/use-mobile";
import { GoogleAnalyticsProvider } from "@/components/GoogleAnalyticsProvider";

export default function Home() {
  const isMobile = useMobile();
  const [, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [, setCursorVariant] = useState("default");

  const heroRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
  const aboutRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
  const servicesRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
  const processRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
  const pricingRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
  const ctaRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
  const whyUsRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;

  useEffect(() => {
    const sectionMap = [
      { ref: heroRef, id: "home" },
      { ref: aboutRef, id: "about" },
      { ref: servicesRef, id: "services" },
      { ref: processRef, id: "process" },
      { ref: pricingRef, id: "pricing" },
      { ref: whyUsRef, id: "whyus" },
      { ref: ctaRef, id: "cta" },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry that's intersecting the most
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) {
          const match = sectionMap.find((s) => s.ref.current === visible.target);
          if (match) setActiveSection(match.id);
        }
      },
      {
        rootMargin: "-50% 0px -50% 0px",
        threshold: [0, 0.5, 1],
      }
    );

    sectionMap.forEach((s) => {
      if (s.ref.current) observer.observe(s.ref.current);
    });
    return () => sectionMap.forEach((s) => s.ref.current && observer.unobserve(s.ref.current));
  }, []);

  const scrollTo = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      const navbarHeight = 80; // Approximate navbar height
      const elementPosition = ref.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setMenuOpen(false);
    }
  };

  const enterButton = () => setCursorVariant("button");
  const enterLink = () => setCursorVariant("link");
  const leaveLink = () => setCursorVariant("default");

  return (
    <GoogleAnalyticsProvider>
      <div className="relative min-h-screen bg-background text-foreground overflow-hidden">
        {!isMobile && <CustomCursor />}
        {/* Navigation */}

      <Navbar
        scrollTo={scrollTo}
        activeSection={activeSection}
        enterButton={enterButton}
        enterLink={enterLink}
        leaveLink={leaveLink}
        refs={{
          heroRef,
          aboutRef,
          servicesRef,
          processRef,
          pricingRef,
          whyUsRef,
          ctaRef,
        }}
      />

      <Hero ref={heroRef} enterButton={enterButton} />

      <SectionSeparator variant="gradient" />

      {/* About Section */}
      <About ref={aboutRef} enterLink={enterLink} leaveLink={leaveLink} />

      <SectionSeparator variant="gradient" />

      {/* Services Section */}
      <Services ref={servicesRef} enterButton={enterButton} />

      <SectionSeparator variant="gradient" />

      {/* Process Section */}
      <Process ref={processRef} enterLink={enterLink} leaveLink={leaveLink} />

      <SectionSeparator variant="gradient" />

      {/* Clients Section */}
      {/* <Clients /> */}
      {/* Pricing Section */}
      <Pricing ref={pricingRef} enterLink={enterLink} leaveLink={leaveLink} enterButton={enterButton} />

      <SectionSeparator variant="gradient" />

      {/* Why Us Section */}
      <WhyUs ref={whyUsRef} enterLink={enterLink} leaveLink={leaveLink} />

      <SectionSeparator variant="gradient" />

      {/* CTA Section */}
      <Cta enterButton={enterButton} leaveLink={leaveLink} ref={ctaRef} />
      {/* Contact Section */}
      {/* <Contact ref={contactRef} enterButton={enterButton} leaveLink={leaveLink} /> */}

      {/* Footer */}
      <Footer />
      </div>
    </GoogleAnalyticsProvider>
  );
}
