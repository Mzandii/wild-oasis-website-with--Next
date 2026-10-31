import "server-only";

import { cache } from "react";
import { auth } from "@/app/_lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { type Guest, ensureGuest, getGuest } from "./data-service";

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

export const requireGuest = cache(async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.email)
    throw new Error("You are not Logged in. Please log in.");
  const guest = await getGuest(session.user.email);
  if (!guest) throw new Error("ME: Guest profile in not in the database");
  return { session, guest, guestId: guest.id };
});
