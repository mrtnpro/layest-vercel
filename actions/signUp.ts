"use server";

import { signIn as signInAction } from "@/auth";

export async function signUp() {
  // TODO: Do some sign up magic here
  return signInAction("keycloak");
}
