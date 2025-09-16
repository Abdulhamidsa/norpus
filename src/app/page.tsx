"use client";

import type React from "react";

import { useEffect, useRef, useState } from "react";
import { useMobile } from "@/hooks/use-mobile";
import CustomCursor from "@/components/custom-cursor";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Process } from "@/components/Process";
import { Pricing } from "@/components/Pricing";
// import { Contact } from "@/components/Contact";
import { Cta } from "@/components/Cta";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { WhyUs } from "@/components/Whyus";

export default function Home() {
  const isMobile = useMobile();
  const [, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [, setCursorVariant] = useState("default");

  const heroRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
  const servicesRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
  const processRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
  const pricingRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
  const contactRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
  const whyUsRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;

  useEffect(() => {
    const sectionMap = [
      { ref: heroRef, id: "home" },
      { ref: servicesRef, id: "services" },
      { ref: processRef, id: "process" },
      { ref: pricingRef, id: "pricing" },
      { ref: contactRef, id: "contact" },
      { ref: whyUsRef, id: "whyus" },
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
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
      setMenuOpen(false);
    }
  };

  const enterButton = () => setCursorVariant("button");
  const enterLink = () => setCursorVariant("link");
  const leaveLink = () => setCursorVariant("default");

  return (
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
          servicesRef,
          processRef,
          pricingRef,
          contactRef,
          whyUsRef,
        }}
      />

      <Hero ref={heroRef} enterButton={enterButton} />

      {/* Services Section */}
      <Services ref={servicesRef} enterButton={enterButton} />
      {/* Process Section */}
      <Process ref={processRef} enterLink={enterLink} leaveLink={leaveLink} />
      {/* Clients Section */}
      {/* <Clients /> */}
      {/* Pricing Section */}
      <Pricing ref={pricingRef} enterLink={enterLink} leaveLink={leaveLink} enterButton={enterButton} />
      {/* CTA Section */}
      <WhyUs ref={whyUsRef} enterLink={enterLink} leaveLink={leaveLink} />
      <Cta enterButton={enterButton} leaveLink={leaveLink} ref={contactRef} />
      {/* Contact Section */}
      {/* <Contact ref={contactRef} enterButton={enterButton} leaveLink={leaveLink} /> */}

      {/* Footer */}
      <Footer />
    </div>
  );
}
