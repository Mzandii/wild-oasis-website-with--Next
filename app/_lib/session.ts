import "server-only";

import { cache } from "react";
import { auth } from "@/app/_lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const getSession = cache(async () => {
  return auth.api.getSession({
    headers: await headers(),
  });
});

export async function requireUser() {
  const session = await getSession();
  console.log("THIS IS IN THE SESSION.TS FILE:", session);

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
