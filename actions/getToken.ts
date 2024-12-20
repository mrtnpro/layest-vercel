import { headers } from "next/headers";

import { getToken as getTokenAction } from "next-auth/jwt";

export async function getToken() {
  const token = await getTokenAction({
    req: {
      headers: Object.fromEntries(await headers()),
    },
    secret: process.env.AUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production" ? true : false,
  });

  if (!token || !token.refresh_token) {
    throw new Error(
      `[getToken] No Token or no refresh token: ${token}, ${process.env.AUTH_SECRET}`,
    );
  }

  return token;
}
