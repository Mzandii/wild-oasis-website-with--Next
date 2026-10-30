import "server-only";

import { cache } from "react";
import { auth } from "@/app/_lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { type Guest, ensureGuest } from "./data-service";

export const getSession = cache(async () => {
  return auth.api.getSession({
    headers: await headers(),
  });
});

export async function requireUser() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return session.user;
}

export const getCurrentGuest = cache(async (): Promise<Guest> => {
  const session = await getSession();

  if (!session?.user) {
    redirect("/login?error=no_session");
  }

  const { user } = session;

  if (!user.email) {
    redirect("/login?error=email_not_found");
  }
  if (!user.emailVerified) {
    redirect("/login?error=unverified_email");
  }

  return ensureGuest({ email: user.email, fullName: user.name });
});
