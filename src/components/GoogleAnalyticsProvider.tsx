"use client";

import { Suspense } from "react";
import { useGoogleAnalytics } from "@/hooks/use-google-analytics";

function GoogleAnalyticsTracker() {
  useGoogleAnalytics();
  return null;
}

export function GoogleAnalyticsProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense fallback={null}>
        <GoogleAnalyticsTracker />
      </Suspense>
      {children}
    </>
  );
}
