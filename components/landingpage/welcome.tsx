import Link from "next/link";

import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { getTranslations } from "next-intl/server";

export default async function WelcomeHome() {
  const session = await auth();
  const user = session?.user;
  const t = await getTranslations("landingPage");

  return (
    <div className="grid min-h-screen items-center justify-items-center gap-16 p-8 text-center">
      <main className="grid gap-8">
        <h1 className="text-xl font-bold">{t("title")}</h1>
        {user ? (
          <div className="grid gap-4">
            {t("welcome", { name: user.name })}
            <Button variant="outline" asChild>
              <Link href="/dashboard">{t("goToDashboard")}</Link>
            </Button>
          </div>
        ) : (
          <Button variant="outline" asChild>
            <Link href="/auth/signin">{t("signIn")}</Link>
          </Button>
        )}
      </main>
    </div>
  );
}
