import { redirect } from "next/navigation";

export default async function Auth() {
  redirect("/auth/signin");
}
