import Link from "next/link";
import { redirect } from "next/navigation";

import { signUp } from "@/actions/signUp";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { KeyIcon } from "@heroicons/react/24/outline";
import { getTranslations } from "next-intl/server";

export default async function Signup() {
  const session = await auth();
  const user = session?.user?.email;

  const t = await getTranslations("auth");

  if (user) {
    redirect("/dashboard");
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">{t("signUp.title")}</CardTitle>
        <CardDescription>{t("signUp.description")}</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="firstName">{t("form.firstName.label")}</Label>
            <Input
              id="firstName"
              type="text"
              placeholder={t("form.firstName.placeholder")}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">{t("form.lastName.label")}</Label>
            <Input
              id="lastName"
              type="text"
              placeholder={t("form.lastName.label")}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">{t("form.email.label")}</Label>
            <Input
              id="email"
              type="email"
              placeholder={t("form.email.placeholder")}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">{t("form.password.label")}</Label>
            <Input
              id="password"
              type="password"
              placeholder={t("form.password.placeholder")}
              required
            />
          </div>

          <form
            className="grid gap-2"
            action={async () => {
              "use server";
              await signUp();
            }}
          >
            <Button type="submit">
              <KeyIcon />
              <span>{t("signUp.button")}</span>
            </Button>
          </form>
        </div>
        <div className="mt-4 text-center text-sm">
          {t("signUp.alreadyHaveAccount")}{" "}
          <Link href="/auth/signin" className="underline">
            {t("signIn.button")}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
