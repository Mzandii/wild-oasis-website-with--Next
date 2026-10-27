"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/app/_lib/auth";
import { safeNext } from "@/app/_lib/utils";

export async function signInAction(formData: FormData) {
  const next = safeNext(formData.get("next"));

  const { url } = await auth.api.signInSocial({
    body: {
      provider: "github",
      callbackURL: next,
      errorCallbackURL: "/login?error=oauth",
    },
    headers: await headers(),
  });

  if (!url) redirect("/login?error=oauth");
  redirect(url); // → github.com authorize page
}

export async function signOutAction() {
  await auth.api.signOut({ headers: await headers() });
  redirect("/");
}
