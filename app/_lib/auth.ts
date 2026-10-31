import "server-only";

import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { Pool } from "pg";

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  database: new Pool({
    connectionString: process.env.DATABASE_URL!,
  }),

  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID! as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET! as string,
    },
  },

  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          try {
            const { ensureGuest } = await import("@/app/_lib/data-service");
            await ensureGuest({
              email: user.email,
              fullName: user.name,
            });
          } catch (error) {
            console.error("Guest creation after sign-up failed:", error);
          }
        },
      },
    },
  },
  plugins: [nextCookies()],
  session: { cookieCache: { enabled: true, maxAge: 30 * 60 } },
});

export type Session = typeof auth.$Infer.Session;
export type SessionUser = Session["user"];
