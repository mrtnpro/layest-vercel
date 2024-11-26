"use server";

import { headers } from "next/headers";

import { signOut as signOutAction } from "@/auth";
import { getToken } from "next-auth/jwt";

export async function federatedSignOut() {
  try {
    const token = await getToken({
      req: {
        headers: Object.fromEntries(await headers()),
        // cookies: Object.fromEntries(
        //   (await cookies()).getAll().map((c) => [c.name, c.value]),
        // ),
      },
      secret: process.env.AUTH_SECRET,
    });

    if (!token || !token.refresh_token) {
      throw new Error(`[federatedSignOut] Token missing, ${token}`);
    }

    const endSession = await fetch(
      "https://auth.layest.com/realms/Layest/protocol/openid-connect/logout",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${token.access_token}`,
        },
        body: new URLSearchParams({
          client_id: process.env.KEYCLOAK_ID!,
          client_secret: process.env.KEYCLOAK_SECRET!,
          refresh_token: token.refresh_token,
        }),
      },
    );

    if (endSession && endSession.status && endSession.status >= 300) {
      throw new Error(
        `[federatedSignOut] Could not end session, ${endSession}`,
      );
    }

    // NOTE: Calling `await signOutAction()` here will call `redirect` from nextjs internally
    // which throws NEXT_REDIRECT and returns the TypeScript never type
    // This will then be caught by our catch block; hence the NEXT_REDIRECT error
    // https://github.com/vercel/next.js/issues/55586#issuecomment-1869024539
    // To solve this, either disable redirect and redirect manually AFTER try/catch block
    // e.g. `await signOutAction({ redirect: false })` then outside of try/catch `redirect('/somewhere')`
    // Or, in our case, call `signOutAction` in finally block which makes sense because
    // even if federated logout fails, we still want to signout user locally

    // await signOutAction();
  } catch (error) {
    console.log("[federatedSignOut]", error);

    // TODO: Log Error
  } finally {
    await signOutAction();
  }
}

export async function signOut() {
  return signOutAction();
}
