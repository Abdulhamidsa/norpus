"use client";

import { event } from "@/lib/gtag";

// Track CTA button clicks
export const trackCTAClick = (location: string) => {
  event("cta_click", {
    event_category: "engagement",
    event_label: location,
  });
};

// Track contact form submissions
export const trackContactSubmission = () => {
  event("contact_form_submit", {
    event_category: "conversion",
    event_label: "contact_form",
  });
};

// Track navigation clicks
export const trackNavigation = (section: string) => {
  event("navigation_click", {
    event_category: "engagement",
    event_label: section,
  });
};

// Track section views (when user scrolls to a section)
export const trackSectionView = (section: string) => {
  event("section_view", {
    event_category: "engagement",
    event_label: section,
  });
};

// Track external link clicks
export const trackExternalLink = (url: string, location: string) => {
  event("external_link_click", {
    event_category: "engagement",
    event_label: `${location}_to_${url}`,
  });
};
