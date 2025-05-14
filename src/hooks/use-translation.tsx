"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

type Language = "en" | "da";

type TranslationContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const translations = {
  en: {
    "nav.home": "Home",
    "nav.services": "Services",
    "nav.process": "Process",
    "nav.pricing": "Pricing",
    "nav.contact": "Contact",
    "nav.whyus": "Why Us?",

    "hero.title.start": "We Build",
    "hero.title.highlight": "Digital",
    "hero.title.end": "Experiences",
    "hero.subtitle": "Transforming ideas into exceptional websites",
    "hero.cta": "Get Free Offer",

    "stats.projects": "Projects Completed",
    "stats.satisfaction": "Satisfaction Rate",
    "stats.clients": "Happy Clients",
    "stats.awards": "Industry Awards",

    "services.title": "Our Services",
    "services.subtitle": "We provide comprehensive digital solutions tailored to your business needs",

    "services.web.title": "Web Development",
    "services.web.description": "Custom websites and web applications built with the latest technologies for optimal performance and user experience.",

    "services.uiux.title": "UI/UX Design",
    "services.uiux.description": "User-centered design that combines aesthetics with functionality to create intuitive and engaging digital experiences.",

    "services.cloud.title": "Cloud Solutions",
    "services.cloud.description": "Scalable and secure cloud infrastructure that grows with your business and ensures reliability.",

    "services.software.title": "Custom Software",
    "services.software.description": "Bespoke software solutions designed to address your specific business challenges and streamline operations.",

    "services.strategy.title": "Digital Strategy",
    "services.strategy.description": "Strategic planning and consultation to help you navigate the digital landscape and achieve your business goals.",

    "services.ecommerce.title": "E-commerce Solutions",
    "services.ecommerce.description": "End-to-end e-commerce platforms that drive sales and provide seamless shopping experiences for your customers.",

    "process.title": "Our Process",
    "process.subtitle": "Our proven methodology ensures successful project delivery every time",

    "process.discovery.title": "Discovery",
    "process.discovery.description": "Tell us about your needs and requirements to get your project started.",

    "process.proposal.title": "Proposal",
    "process.proposal.description": "Receive and discuss your personalized quote within 24 hours.",

    "process.planning.title": "Planning",
    "process.planning.description": "We agree on the scope and timeline of the project together.",

    "process.development.title": "Development",
    "process.development.description": "Our team builds your solution with regular updates and feedback.",

    "process.launch.title": "Launch",
    "process.launch.description": "Receive your personalized solution live and ready for the world.",

    "clients.title": "Trusted By",
    "clients.subtitle": "Companies that trust our expertise",

    "pricing.title": "Our Pricing",
    "pricing.subtitle": "Transparent pricing options to suit businesses of all sizes",

    "pricing.basic.title": "Basic",
    "pricing.basic.description": "Perfect for small businesses just getting started",
    "pricing.basic.features.0": "5-page responsive website",
    "pricing.basic.features.1": "Basic SEO optimization",
    "pricing.basic.features.2": "Contact form",
    "pricing.basic.features.3": "Mobile-friendly design",
    "pricing.basic.features.4": "1 month of support",
    "pricing.basic.cta": "Get Started",

    "pricing.professional.title": "Professional",
    "pricing.professional.description": "Ideal for growing businesses with specific needs",
    "pricing.professional.features.0": "10-page responsive website",
    "pricing.professional.features.1": "Advanced SEO package",
    "pricing.professional.features.2": "Content management system",
    "pricing.professional.features.3": "E-commerce functionality (up to 50 products)",
    "pricing.professional.features.4": "Social media integration",
    "pricing.professional.features.5": "3 months of support",
    "pricing.professional.cta": "Get Started",

    "pricing.enterprise.title": "Enterprise",
    "pricing.enterprise.description": "Comprehensive solution for established businesses",
    "pricing.enterprise.features.0": "Custom website with unlimited pages",
    "pricing.enterprise.features.1": "Premium SEO & marketing package",
    "pricing.enterprise.features.2": "Advanced e-commerce functionality",
    "pricing.enterprise.features.3": "Custom integrations & API development",
    "pricing.enterprise.features.4": "Dedicated account manager",
    "pricing.enterprise.features.5": "12 months of priority support",
    "pricing.enterprise.cta": "Contact Us",

    "cta.title": "Ready to Transform Your Digital Presence?",
    "cta.subtitle": "Let's discuss how we can help your business grow with a custom digital solution.",
    "cta.button": "Get Free Offer",
    "contact.title": "Get In Touch",
    "contact.subtitle": "Ready to start your next project? Contact us today for a free consultation",

    "contact.info.title": "Contact Information",
    "contact.info.subtitle": "We're located in Copenhagen and available during business hours. Reach out through any of these channels for a quick response.",

    "contact.info.location.title": "Location",
    "contact.info.location.address": "Nørrebrogade 42, Copenhagen, 2200",
    "contact.info.location.country": "Denmark",

    "contact.info.email.title": "Email",

    "contact.info.phone.title": "Phone & WhatsApp",
    "contact.info.phone.whatsapp": "Chat on WhatsApp",

    "contact.info.hours.title": "Opening Hours",
    "contact.info.hours.weekdays": "Monday - Friday: 9:00 AM - 6:00 PM",
    "contact.info.hours.weekend": "Saturday - Sunday: Closed",

    "contact.form.title": "Send Us a Message",
    "contact.form.subtitle": "Fill out the form below and we'll get back to you within 24 hours.",

    "contact.form.name.label": "Name",
    "contact.form.name.placeholder": "Your name",

    "contact.form.email.label": "Email",
    "contact.form.email.placeholder": "Your email",

    "contact.form.subject.label": "Subject",
    "contact.form.subject.placeholder": "How can we help?",

    "contact.form.message.label": "Message",
    "contact.form.message.placeholder": "Tell us about your project...",

    "contact.form.submit": "Send Message",

    "footer.location": "Located in Copenhagen, Denmark. Available Monday-Friday, 9:00 AM - 6:00 PM.",
    "footer.rights": "All rights reserved.",

    "language.toggle": "Dansk",

    "whyus.title": "Why Choose Us",
    "whyus.subtitle": "We're not another WordPress shop. We're your modern tech team.",
    "whyus.point.0": "Built with modern technologies – no WordPress templates",
    "whyus.point.1": "Skilled developers with hands-on experience",
    "whyus.point.2": "Free live demos available",
    "whyus.point.3": "Free consultations to help you choose what's best",
    "whyus.point.4": "Online meetings & flexible communication",
    "whyus.point.5": "Based in Denmark – EU-hosted servers",

    pricing: {
      title: "Pricing Plans",
      subtitle: "Simple, transparent pricing tailored for businesses in Denmark.",

      basic: {
        title: "Starter",
        description: "Perfect for small businesses or solo startups.",
        features: ["Hosting & deployment included", "Up to 5 content edits per month", "3 months free maintenance", "Mobile-friendly design", "Email support"],
        cta: "Choose Starter",
      },

      professional: {
        title: "Pro",
        description: "Ideal for growing businesses that want peace of mind.",
        features: ["Everything in Starter", "Unlimited content edits", "Priority support", "Performance & SEO checkups", "Monthly analytics report", "Backup & monitoring"],
        cta: "Choose Pro",
      },

      enterprise: {
        title: "Custom",
        description: "Tailored for larger businesses with special needs.",
        features: ["Everything in Pro", "Custom integrations", "Multi-language setup", "Ongoing maintenance agreement", "Design & feature consulting", "Personal contact person"],
        cta: "Contact Us",
      },
    },
  },
  da: {
    "nav.home": "Hjem",
    "nav.services": "Ydelser",
    "nav.process": "Proces",
    "nav.pricing": "Priser",
    "nav.contact": "Kontakt",
    "nav.whyus": "Hvorfor Os?",

    "hero.title.start": "Vi Skaber",
    "hero.title.highlight": "Digitale",
    "hero.title.end": "Oplevelser",
    "hero.subtitle": "Vi transformerer idéer til exceptionelle hjemmesider",
    "hero.cta": "Få Gratis Tilbud",

    "stats.projects": "Gennemførte Projekter",
    "stats.satisfaction": "Tilfredshedsrate",
    "stats.clients": "Tilfredse Kunder",
    "stats.awards": "Branchepriser",

    "services.title": "Vores Ydelser",
    "services.subtitle": "Vi leverer omfattende digitale løsninger skræddersyet til din virksomheds behov",

    "services.web.title": "Webudvikling",
    "services.web.description": "Skræddersyede hjemmesider og webapplikationer bygget med de nyeste teknologier for optimal ydeevne og brugeroplevelse.",

    "services.uiux.title": "UI/UX Design",
    "services.uiux.description": "Brugercentreret design, der kombinerer æstetik med funktionalitet for at skabe intuitive og engagerende digitale oplevelser.",

    "services.cloud.title": "Cloud-løsninger",
    "services.cloud.description": "Skalerbar og sikker cloud-infrastruktur, der vokser med din virksomhed og sikrer pålidelighed.",

    "services.software.title": "Skræddersyet Software",
    "services.software.description": "Skræddersyede softwareløsninger designet til at imødekomme dine specifikke forretningsudfordringer og strømline driften.",

    "services.strategy.title": "Digital Strategi",
    "services.strategy.description": "Strategisk planlægning og rådgivning for at hjælpe dig med at navigere i det digitale landskab og nå dine forretningsmål.",

    "services.ecommerce.title": "E-handelsløsninger",
    "services.ecommerce.description": "Komplette e-handelsplatforme, der øger salget og giver en problemfri shoppingoplevelse for dine kunder.",

    "process.title": "Vores Proces",
    "process.subtitle": "Vores gennemprøvede metode sikrer vellykket projektlevering hver gang",

    "process.discovery.title": "Opdagelse",
    "process.discovery.description": "Fortæl os om dine behov og krav for at få dit projekt i gang.",

    "process.proposal.title": "Tilbud",
    "process.proposal.description": "Modtag og diskuter dit personlige tilbud inden for 24 timer.",

    "process.planning.title": "Planlægning",
    "process.planning.description": "Vi bliver enige om projektets omfang og tidsplan sammen.",

    "process.development.title": "Udvikling",
    "process.development.description": "Vores team bygger din løsning med regelmæssige opdateringer og feedback.",

    "process.launch.title": "Lancering",
    "process.launch.description": "Modtag din personlige løsning live og klar til verden.",

    "clients.title": "Betroet Af",
    "clients.subtitle": "Virksomheder der stoler på vores ekspertise",

    "pricing.title": "Vores Priser",
    "pricing.subtitle": "Gennemsigtige prisoptioner til virksomheder i alle størrelser",

    "pricing.basic.title": "Basis",
    "pricing.basic.description": "Perfekt til små virksomheder, der lige er startet",
    "pricing.basic.features.0": "5-siders responsivt website",
    "pricing.basic.features.1": "Grundlæggende SEO-optimering",
    "pricing.basic.features.2": "Kontaktformular",
    "pricing.basic.features.3": "Mobilvenligt design",
    "pricing.basic.features.4": "1 måneds support",
    "pricing.basic.cta": "Kom i Gang",

    "pricing.professional.title": "Professionel",
    "pricing.professional.description": "Ideel til voksende virksomheder med specifikke behov",
    "pricing.professional.features.0": "10-siders responsivt website",
    "pricing.professional.features.1": "Avanceret SEO-pakke",
    "pricing.professional.features.2": "Content management system",
    "pricing.professional.features.3": "E-handelsfunktionalitet (op til 50 produkter)",
    "pricing.professional.features.4": "Integration med sociale medier",
    "pricing.professional.features.5": "3 måneders support",
    "pricing.professional.cta": "Kom i Gang",

    "pricing.enterprise.title": "Enterprise",
    "pricing.enterprise.description": "Omfattende løsning til etablerede virksomheder",
    "pricing.enterprise.features.0": "Skræddersyet website med ubegrænsede sider",
    "pricing.enterprise.features.1": "Premium SEO & marketing pakke",
    "pricing.enterprise.features.2": "Avanceret e-handelsfunktionalitet",
    "pricing.enterprise.features.3": "Tilpassede integrationer & API-udvikling",
    "pricing.enterprise.features.4": "Dedikeret account manager",
    "pricing.enterprise.features.5": "12 måneders prioriteret support",
    "pricing.enterprise.cta": "Kontakt Os",

    "cta.title": "Klar til at Transformere Din Digitale Tilstedeværelse?",
    "cta.subtitle": "Lad os diskutere, hvordan vi kan hjælpe din virksomhed med at vokse med en skræddersyet digital løsning.",
    "cta.button": "Få Gratis Tilbud",
    "contact.title": "Kontakt Os",
    "contact.subtitle": "Klar til at starte dit næste projekt? Kontakt os i dag for en gratis konsultation",

    "contact.info.title": "Kontaktoplysninger",
    "contact.info.subtitle": "Vi er placeret i København og tilgængelige i åbningstiden. Kontakt os gennem en af disse kanaler for et hurtigt svar.",

    "contact.info.location.title": "Placering",
    "contact.info.location.address": "Nørrebrogade 42, København, 2200",
    "contact.info.location.country": "Danmark",

    "contact.info.email.title": "Email",

    "contact.info.phone.title": "Telefon & WhatsApp",
    "contact.info.phone.whatsapp": "Chat på WhatsApp",

    "contact.info.hours.title": "Åbningstider",
    "contact.info.hours.weekdays": "Mandag - Fredag: 9:00 - 18:00",
    "contact.info.hours.weekend": "Lørdag - Søndag: Lukket",

    "contact.form.title": "Send Os en Besked",
    "contact.form.subtitle": "Udfyld formularen nedenfor, og vi vender tilbage inden for 24 timer.",

    "contact.form.name.label": "Navn",
    "contact.form.name.placeholder": "Dit navn",

    "contact.form.email.label": "Email",
    "contact.form.email.placeholder": "Din email",

    "contact.form.subject.label": "Emne",
    "contact.form.subject.placeholder": "Hvordan kan vi hjælpe?",

    "contact.form.message.label": "Besked",
    "contact.form.message.placeholder": "Fortæl os om dit projekt...",

    "contact.form.submit": "Send Besked",

    "footer.location": "Beliggende i København, Danmark. Tilgængelig mandag-fredag, 9:00 - 18:00.",
    "footer.rights": "Alle rettigheder forbeholdes.",

    "language.toggle": "English",
    "whyus.title": "Hvorfor Vælge Os",
    "whyus.subtitle": "Vi er ikke endnu et WordPress-bureau – vi er dit moderne tech-team.",
    "whyus.point.0": "Bygget med moderne teknologier – ingen WordPress-skabeloner",
    "whyus.point.1": "Dygtige udviklere med praktisk erfaring",
    "whyus.point.2": "Gratis live demos tilgængelige",
    "whyus.point.3": "Gratis rådgivning for at finde den bedste løsning",
    "whyus.point.4": "Online møder & fleksibel kommunikation",
    "whyus.point.5": "Baseret i Danmark – EU-hostede servere",
  },
  pricing: {
    title: "Prispakker",
    subtitle: "Enkelt og gennemsigtigt – lavet til virksomheder i Danmark.",

    basic: {
      title: "Starter",
      description: "Perfekt til små virksomheder eller solo-startups.",
      features: ["Hosting & deployment inkluderet", "Op til 5 indholdsændringer pr. måned", "3 måneders gratis vedligeholdelse", "Mobilvenligt design", "E-mail support"],
      cta: "Vælg Starter",
    },

    professional: {
      title: "Pro",
      description: "Til dig der vil vokse og have ro i maven.",
      features: ["Alt i Starter-planen", "Ubegrænsede ændringer", "Prioriteret support", "Performance & SEO tjek", "Månedlig analyse-rapport", "Backup og overvågning"],
      cta: "Vælg Pro",
    },

    enterprise: {
      title: "Skræddersyet",
      description: "Til større virksomheder med særlige behov.",
      features: ["Alt i Pro-planen", "Tilpassede integrationer", "Flersprogsopsætning", "Fast vedligeholdelsesaftale", "Design- og funktionsrådgivning", "Personlig kontaktperson"],
      cta: "Kontakt os",
    },
  },
};

const TranslationContext = createContext<TranslationContextType>({
  language: "en",
  setLanguage: () => {},
  t: () => "",
});

export const TranslationProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");

  // Check browser language on initial load
  useEffect(() => {
    const browserLang = navigator.language.split("-")[0];
    if (browserLang === "da") {
      setLanguage("da");
    }
  }, []);

  const t = (key: string): string => {
    const translation = translations[language][key as keyof (typeof translations)[typeof language]];
    if (!translation) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    return translation;
  };

  return <TranslationContext.Provider value={{ language, setLanguage, t }}>{children}</TranslationContext.Provider>;
};

export const useTranslation = () => useContext(TranslationContext);
