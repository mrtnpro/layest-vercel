"use server";

import { revalidatePath } from "next/cache";

import { Locale } from "@/i18n/config";
import { setUserLocale } from "@/i18n/db";

export default async function updateLocale(data: FormData) {
  const locale = data.get("locale") as Locale;

  setUserLocale(locale);

  // Note: We need to call `router.refresh()` additionally on
  // the client side for the client receive updated markup
  revalidatePath("/");
}
