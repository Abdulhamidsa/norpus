"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { pageview } from "@/lib/gtag";

export const useGoogleAnalytics = () => {
  const pathname = usePathname();

  useEffect(() => {
    // Create URL without search params to avoid Suspense issues
    const url = new URL(window.location.href);
    url.pathname = pathname;
    
    pageview(url);
  }, [pathname]);
};
