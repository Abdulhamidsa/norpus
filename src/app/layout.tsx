import type React from "react";
import "@/app/globals.css";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "next-themes";
import { TranslationProvider } from "@/hooks/use-translation";
import GoogleAnalytics from "@/components/GoogleAnalytics";

export const metadata = {
  title: "Norpus Studio",
  description: "Welcome to Norpus Studio – innovative digital design & creative solutions.",
  keywords: "Norpus, Studio, digital, design, creative, solutions",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <GoogleAnalytics />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <TranslationProvider>{children}</TranslationProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
