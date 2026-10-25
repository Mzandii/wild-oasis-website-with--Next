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

  plugins: [nextCookies()],
  session: { cookieCache: { enabled: true, maxAge: 5 * 60 } },
});

export type Session = typeof auth.$Infer.Session;
export type SessionUser = Session["user"];
