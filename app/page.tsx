import { redirect } from "next/navigation";

import { auth } from "@/auth";

export default async function Index() {
  const session = await auth();

  if (!session) {
    redirect("/auth/signin");
  }

  if (session) {
    redirect("/dashboard");
  }
}
