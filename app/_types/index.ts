// app/_types/index.ts
export type Guest = {
  id: number;
  fullName: string;
  email: string;
  nationalID: string | null | undefined;
  nationality: string | null | undefined;
  countryFlag: string | null | undefined;
};

export type Cabin = {
  id: number;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  image: string;
  description: string;
};

export type Settings = {
  minBookingLength: number;
  maxBookingLength: number;
  maxGuestsPerBooking: number;
};

export type Booking = {
  id: number;
  created_at: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  cabinPrice: number;
  extrasPrice: number;
  totalPrice: number;
  status: "unconfirmed" | "checked-in" | "checked-out";
  hasBreakfast: boolean;
  isPaid: boolean;
  observations: string | null;
  cabinId: number;
  guestId: number;
};

// what the reservations list needs (getBookings joins cabins)
export type BookingListItem = Pick<
  Booking,
  | "id"
  | "created_at"
  | "startDate"
  | "endDate"
  | "numNights"
  | "numGuests"
  | "totalPrice"
  | "guestId"
  | "cabinId"
> & { cabins: { name: string; image: string } };

// expected-outcome type for actions that return instead of throw
export type ActionResult = { ok: true } | { ok: false; error: string };
