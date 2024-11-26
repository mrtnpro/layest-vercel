import { headers } from "next/headers";

import { getToken as getTokenAction } from "next-auth/jwt";

export async function getToken() {
  const token = await getTokenAction({
    req: {
      headers: Object.fromEntries(await headers()),
    },
    secret: process.env.AUTH_SECRET,
  });

  if (!token || !token.refresh_token) {
    throw new Error("Token missing");
  }

  return token;
}
