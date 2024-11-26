import { redirect } from "next/navigation";

import { auth, signIn } from "@/auth";
import Document from "@/components/document";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Locale } from "@/i18n/config";
import "@valibot/i18n/de";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

export const metadata: Metadata = {
  title: "Layest App",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (!session) {
    redirect("/auth/signin");
  }

  if (session.error === "RefreshTokenError") {
    // Force sign in to obtain a new set of access and refresh tokens
    await signIn("keycloak");
  }

  const locale = (await getLocale()) as Locale;
  const messages = await getMessages();

  return (
    <Document locale={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>{children}</SidebarInset>
          </SidebarProvider>
        </NextIntlClientProvider>
      </body>
    </Document>
  );
}
