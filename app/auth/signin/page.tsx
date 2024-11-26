import Link from "next/link";
import { redirect } from "next/navigation";

import { auth, signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { KeyIcon } from "@heroicons/react/24/outline";
import { getTranslations } from "next-intl/server";

export default async function Signin() {
  const session = await auth();
  const user = session?.user?.email;

  if (user) {
    redirect("/dashboard");
  }

  const t = await getTranslations("auth");

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">{t("signIn.title")}</CardTitle>
        <CardDescription>{t("signIn.description")}</CardDescription>
      </CardHeader>

      <CardContent>
        <form
          action={async () => {
            "use server";
            await signIn("keycloak", { redirectTo: "/dashboard" });
          }}
        >
          <Button type="submit" className="w-full">
            <KeyIcon />
            {t("signIn.button")}
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          {t("signIn.noAccount")}{" "}
          <Link href="/auth/signup" className="underline">
            {t("signUp.button")}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
