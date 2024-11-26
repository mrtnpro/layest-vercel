"use client";

import { useRouter } from "next/navigation";

import { Locale } from "@/i18n/config";
import updateLocale from "@/i18n/update-locale";
import { useLocale } from "next-intl";

export function AppNavigationLocaleSwitcher() {
  const router = useRouter();

  async function action(data: FormData) {
    await updateLocale(data);

    // Refetch the page to receive markup that
    // uses the latest value from the cookie
    router.refresh();
  }

  return (
    <form action={action} className="flex gap-2 py-5">
      <LocaleButton locale="en" />
      <LocaleButton locale="de" />
    </form>
  );
}

function LocaleButton({ locale }: { locale: Locale }) {
  const curLocale = useLocale();

  return (
    <button
      className={
        curLocale === locale ? "pointer-events-none opacity-25" : "underline"
      }
      name="locale"
      type="submit"
      value={locale}
    >
      {locale.toUpperCase()}
    </button>
  );
}
