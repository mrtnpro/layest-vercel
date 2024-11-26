import { loadEnvConfig } from "@next/env";
import NextAuth from "next-auth";
import { DefaultJWT, JWT } from "next-auth/jwt";
import KeycloakProvider from "next-auth/providers/keycloak";
import { cwd } from "node:process";

loadEnvConfig(cwd());

declare module "next-auth" {
  //   interface User {
  //     role: string;
  //   }
  interface Session {
    error?: "RefreshTokenError";
  }
}
declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    access_token: string;
    expires_at: number;
    refresh_token?: string;
    error?: "RefreshTokenError";
  }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_ID!,
      clientSecret: process.env.KEYCLOAK_SECRET!,
      issuer: process.env.KEYCLOAK_ISSUER,
      authorization: { params: { scope: "openid roles organization" } },
    }),
  ],
  callbacks: {
    // NOTE: For some reasons next-auth's module augmentation necessary to extend the JWT type
    // does not seem to work for the return type of the `jwt` callback function, therefore
    // we enforce it for now ¯\_(ツ)_/¯
    jwt: async ({ token, account }): Promise<JWT> => {
      if (account && account.access_token && account.expires_at) {
        // First-time login, save the `access_token`, its expiry and the `refresh_token`
        return {
          ...token,
          access_token: account.access_token,
          expires_at: account.expires_at,
          refresh_token: account.refresh_token,
        };
      } else if (Date.now() < token.expires_at * 1000) {
        // Subsequent logins, but the `access_token` is still valid
        return token;
      } else {
        // Subsequent logins, but the `access_token` has expired, try to refresh it
        if (!token.refresh_token) throw new TypeError("Missing refresh_token");

        try {
          // The `token_endpoint` can be found in the provider's documentation. Or if they support OIDC,
          // at their `/.well-known/openid-configuration` endpoint.
          // i.e. https://accounts.google.com/.well-known/openid-configuration
          const response = await fetch(
            "https://auth.layest.com/realms/Layest/protocol/openid-connect/token",
            {
              method: "POST",
              body: new URLSearchParams({
                client_id: process.env.KEYCLOAK_ID!,
                client_secret: process.env.KEYCLOAK_SECRET!,
                grant_type: "refresh_token",
                refresh_token: token.refresh_token,
              }),
            },
          );

          const tokensOrError = await response.json();

          if (!response.ok) throw tokensOrError;

          const newTokens = tokensOrError as {
            access_token: string;
            expires_in: number;
            refresh_token?: string;
          };

          token.access_token = newTokens.access_token;
          token.expires_at = Math.floor(
            Date.now() / 1000 + newTokens.expires_in,
          );

          // Some providers only issue refresh tokens once, so preserve if we did not get a new one
          if (newTokens.refresh_token)
            token.refresh_token = newTokens.refresh_token;

          return token;
        } catch (error) {
          console.error("Error refreshing access_token", error);
          // If we fail to refresh the token, return an error so we can handle it on the page

          // TODO: Handle this case; e.g. redirect; show toast; etc

          token.error = "RefreshTokenError";
          return token;
        }
      }
    },
    async session({ session, token }) {
      session.error = token.error;
      return session;
    },
  },
});
