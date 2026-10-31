"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireGuest } from "./session";
import { updateGuest as updateGuestInSupabase } from "./data-service";

const profileSchema = z.object({
  nationalID: z
    .string()
    .regex(
      /^[a-zA-Z0-9]{6,12}$/,
      "Please provide a valid national ID (6–12 letters or digits)",
    ),
  nationality: z
    .string()
    .regex(/^[^%]{1,100}%https:\/\/[^%\s]{1,300}$/, "Invalid country"),
});

export async function updateGuestProfileAction(
  formData: FormData,
): Promise<void> {
  const { guestId } = await requireGuest();

  const parsed = profileSchema.safeParse({
    nationalID: formData.get("nationalID"),
    nationality: formData.get("nationality"),
  });

  if (!parsed.success)
    throw new Error(parsed.error.issues[0]?.message ?? "Invalid data");

  const [nationality, countryFlag] = parsed.data.nationality.split("%");

  await updateGuestInSupabase(guestId, {
    nationality,
    countryFlag,
    nationalID: parsed.data.nationalID,
  });

  revalidatePath("/account/profile");
}
