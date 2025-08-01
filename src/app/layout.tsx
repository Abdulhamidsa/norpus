import type React from "react";
import "@/app/globals.css";
import { TranslationProvider } from "@/hooks/use-translation";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/next";

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
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <TranslationProvider>{children}</TranslationProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
