import Document from "@/components/document";
import { Toaster } from "@/components/ui/sonner";
import { Locale } from "@/i18n/config";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

export const metadata: Metadata = {
  title: "Layest Authentication",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = (await getLocale()) as Locale;
  const messages = await getMessages();

  return (
    <Document locale={locale}>
      <body
        className={
          "flex min-h-screen flex-col items-center justify-center px-4"
        }
      >
        <NextIntlClientProvider messages={messages}>
          {children}
          <Toaster richColors />
        </NextIntlClientProvider>
      </body>
    </Document>
  );
}
