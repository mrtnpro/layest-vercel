import { ReactNode } from "react";

import { Poppins } from "next/font/google";

import { type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

import "./globals.css";

const poppins = Poppins({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

type Props = {
  children: ReactNode;
  locale?: Locale;
};

export default function Document({ children, locale = "en" }: Props) {
  return (
    <html
      className={cn(
        "bg-background font-sans text-foreground antialiased",
        poppins.variable,
      )}
      lang={locale}
    >
      {children}
    </html>
  );
}
