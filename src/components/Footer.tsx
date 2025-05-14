import React from "react";
import { useTranslation } from "@/hooks/use-translation";
import Link from "next/link";

export const Footer = () => {
  const { t } = useTranslation();
  return (
    <>
      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Link href="/" className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-1 shadow-md animate-pulse">
                  <div className="w-full h-full bg-gray-900 rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full border-2 border-pink-200"></div>
                  </div>
                </div>
                {/* <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">Norpus Studio</span> */}
              </Link>
              <span className="text-lg font-bold">Norpus</span>
            </div>

            <p className="text-sm text-muted-foreground text-center mb-4 md:mb-0">{t("footer.location")}</p>

            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Norpus. {t("footer.rights")}
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};
