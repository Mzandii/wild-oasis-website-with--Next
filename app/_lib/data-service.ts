import { eachDayOfInterval } from "date-fns";
import { z } from "zod";
import { supabase } from "./supabase"; // adjust path as needed

/////////////
// ZOD SCHEMAS

export const CabinSchema = z.object({
  id: z.number(),
  name: z.string(),
  maxCapacity: z.number(),
  regularPrice: z.number(),
  discount: z.number(),
  image: z.string(),
  description: z.string().optional(),
  created_at: z.string().optional(),
});

export const CabinPriceSchema = z.object({
  regularPrice: z.number(),
  discount: z.number(),
});

export const GuestSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  fullName: z.string(),
  nationalID: z.string().optional().nullable(),
  nationality: z.string().optional().nullable(),
  countryFlag: z.string().optional().nullable(),
  created_at: z.string().optional(),
});

export const BookingSchema = z.object({
  id: z.number(),
  created_at: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  numNights: z.number(),
  numGuests: z.number(),
  totalPrice: z.number(),
  guestId: z.number(),
  cabinId: z.number(),
  status: z.string().optional(),
  observations: z.string().optional().nullable(),
  cabins: z
    .object({
      name: z.string(),
      image: z.string(),
    })
    .nullable()
    .optional(),
});

export const SettingsSchema = z.object({
  id: z.number(),
  minBookingLength: z.number(),
  maxBookingLength: z.number(),
  maxGuestsPerBooking: z.number(),
  breakfastPrice: z.number(),
});

export const CountrySchema = z.object({
  name: z.string(),
  flag: z.string(),
});

export const NewGuestSchema = GuestSchema.omit({
  id: true,
  created_at: true,
});

export const NewBookingSchema = BookingSchema.omit({
  id: true,
  created_at: true,
  cabins: true,
});

export const UpdateGuestSchema = NewGuestSchema.partial();
export const UpdateBookingSchema = NewBookingSchema.partial();

/////////////
// INFERRED TYPES

export type Cabin = z.infer<typeof CabinSchema>;
export type CabinPrice = z.infer<typeof CabinPriceSchema>;
export type Guest = z.infer<typeof GuestSchema>;
export type Booking = z.infer<typeof BookingSchema>;
export type Settings = z.infer<typeof SettingsSchema>;
export type Country = z.infer<typeof CountrySchema>;
export type NewGuest = z.infer<typeof NewGuestSchema>;
export type NewBooking = z.infer<typeof NewBookingSchema>;
export type UpdateGuest = z.infer<typeof UpdateGuestSchema>;
export type UpdateBooking = z.infer<typeof UpdateBookingSchema>;

/////////////
// GET

export async function getCabin(id: number): Promise<Cabin | null> {
  const { data, error } = await supabase
    .from("cabins")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  const parsed = CabinSchema.safeParse(data);
  if (!parsed.success) {
    console.error("Invalid cabin data:", parsed.error.flatten());
    return null;
  }

  return parsed.data;
}

export async function getCabinPrice(id: number): Promise<CabinPrice | null> {
  const { data, error } = await supabase
    .from("cabins")
    .select("regularPrice, discount")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  const parsed = CabinPriceSchema.safeParse(data);
  if (!parsed.success) {
    console.error("Invalid cabin price data:", parsed.error.flatten());
    return null;
  }

  return parsed.data;
}

export const getCabins = async function (): Promise<Cabin[]> {
  const { data, error } = await supabase
    .from("cabins")
    .select("id, name, maxCapacity, regularPrice, discount, image")
    .order("name");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  const parsed = z.array(CabinSchema).safeParse(data);
  if (!parsed.success) {
    console.error("Invalid cabins data:", parsed.error.flatten());
    throw new Error("Cabins data is invalid");
  }

  return parsed.data;
};

// Guests are uniquely identified by their email address
export async function getGuest(email: string): Promise<Guest | null> {
  const { data } = await supabase
    .from("guests")
    .select("*")
    .eq("email", email)
    .single();

  // No error here! We handle the possibility of no guest in the sign in callback
  if (!data) return null;

  const parsed = GuestSchema.safeParse(data);
  if (!parsed.success) {
    console.error("Invalid guest data:", parsed.error.flatten());
    return null;
  }

  return parsed.data;
}

export async function getBooking(id: number): Promise<Booking> {
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not get loaded");
  }

  const parsed = BookingSchema.safeParse(data);
  if (!parsed.success) {
    console.error("Invalid booking data:", parsed.error.flatten());
    throw new Error("Booking data is invalid");
  }

  return parsed.data;
}

export async function getBookings(guestId: number): Promise<Booking[]> {
  const { data, error } = await supabase
    .from("bookings")
    .select(
      "id, created_at, startDate, endDate, numNights, numGuests, totalPrice, guestId, cabinId, cabins(name, image)",
    )
    .eq("guestId", guestId)
    .order("startDate");

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  const parsed = z.array(BookingSchema).safeParse(data);
  if (!parsed.success) {
    console.error("Invalid bookings data:", parsed.error.flatten());
    throw new Error("Bookings data is invalid");
  }

  return parsed.data;
}

export async function getBookedDatesByCabinId(
  cabinId: number,
): Promise<Date[]> {
  let today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const todayStr = today.toISOString();

  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("cabinId", cabinId)
    .or(`startDate.gte.${todayStr},status.eq.checked-in`);

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  const parsed = z.array(BookingSchema).safeParse(data);
  if (!parsed.success) {
    console.error("Invalid booked dates data:", parsed.error.flatten());
    throw new Error("Booked dates data is invalid");
  }

  const bookedDates = parsed.data
    .map((booking) =>
      eachDayOfInterval({
        start: new Date(booking.startDate),
        end: new Date(booking.endDate),
      }),
    )
    .flat();

  return bookedDates;
}

export async function getSettings(): Promise<Settings> {
  const { data, error } = await supabase.from("settings").select("*").single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be loaded");
  }

  const parsed = SettingsSchema.safeParse(data);
  if (!parsed.success) {
    console.error("Invalid settings data:", parsed.error.flatten());
    throw new Error("Settings data is invalid");
  }

  return parsed.data;
}

export async function getCountries(): Promise<Country[]> {
  try {
    const res = await fetch(
      "https://restcountries.com/v2/all?fields=name,flag",
    );
    const countries = await res.json();

    const parsed = z.array(CountrySchema).safeParse(countries);
    if (!parsed.success) {
      console.error("Invalid countries data:", parsed.error.flatten());
      throw new Error("Countries data is invalid");
    }

    return parsed.data;
  } catch {
    throw new Error("Could not fetch countries");
  }
}

/////////////
// CREATE

export async function createGuest(newGuest: NewGuest): Promise<Guest[]> {
  // Validate input before sending to Supabase
  const validated = NewGuestSchema.parse(newGuest);

  const { data, error } = await supabase.from("guests").insert([validated]);

  if (error) {
    console.error(error);
    throw new Error("Guest could not be created");
  }

  const parsed = z.array(GuestSchema).safeParse(data);
  if (!parsed.success) {
    console.error("Invalid created guest data:", parsed.error.flatten());
    throw new Error("Created guest data is invalid");
  }

  return parsed.data;
}

export async function createBooking(newBooking: NewBooking): Promise<Booking> {
  const validated = NewBookingSchema.parse(newBooking);

  const { data, error } = await supabase
    .from("bookings")
    .insert([validated])
    // So that the newly created object gets returned!
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be created");
  }

  const parsed = BookingSchema.safeParse(data);
  if (!parsed.success) {
    console.error("Invalid created booking data:", parsed.error.flatten());
    throw new Error("Created booking data is invalid");
  }

  return parsed.data;
}

/////////////
// UPDATE

// The updatedFields is an object which should ONLY contain the updated data
export async function updateGuest(
  id: number,
  updatedFields: UpdateGuest,
): Promise<Guest> {
  const validated = UpdateGuestSchema.parse(updatedFields);

  const { data, error } = await supabase
    .from("guests")
    .update(validated)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Guest could not be updated");
  }

  const parsed = GuestSchema.safeParse(data);
  if (!parsed.success) {
    console.error("Invalid updated guest data:", parsed.error.flatten());
    throw new Error("Updated guest data is invalid");
  }

  return parsed.data;
}

export async function updateBooking(
  id: number,
  updatedFields: UpdateBooking,
): Promise<Booking> {
  const validated = UpdateBookingSchema.parse(updatedFields);

  const { data, error } = await supabase
    .from("bookings")
    .update(validated)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }

  const parsed = BookingSchema.safeParse(data);
  if (!parsed.success) {
    console.error("Invalid updated booking data:", parsed.error.flatten());
    throw new Error("Updated booking data is invalid");
  }

  return parsed.data;
}

/////////////
// DELETE

export async function deleteBooking(id: number): Promise<Booking[]> {
  const { data, error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", id)
    .select();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }

  const parsed = z.array(BookingSchema).safeParse(data);
  if (!parsed.success) {
    console.error("Invalid deleted booking data:", parsed.error.flatten());
    throw new Error("Deleted booking data is invalid");
  }

  return parsed.data;
}
