import "server-only";

import { cache } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/app/_lib/auth";

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

// {
//   session: {
//     id: "...",
//     userId: "...",
//     expiresAt: new Date(),
//     // Other session fields
//   },
//   user: {
//     id: "...",
//     name: "...",
//     email: "...",
//     image: "...",
//     // Other configured user fields
//   }
// }
