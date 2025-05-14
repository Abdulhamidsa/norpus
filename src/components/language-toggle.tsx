"use client";

import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/use-translation";
import { Languages } from "lucide-react";
import { motion } from "framer-motion";

interface LanguageToggleProps {
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export function LanguageToggle({ onMouseEnter, onMouseLeave }: LanguageToggleProps) {
  const { language, setLanguage, t } = useTranslation();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "da" : "en");
  };

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button variant="ghost" size="sm" className="flex items-center gap-1 px-2 cursor-pointer" onClick={toggleLanguage} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <Languages className="h-4 w-4 mr-1" />
        {t("language.toggle")}
      </Button>
    </motion.div>
  );
}
