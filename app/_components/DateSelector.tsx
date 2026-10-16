"use client";

import { isWithinInterval } from "date-fns";
import { DayPicker, type DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useReservationContext } from "./ReservationContext";
import type { Cabin, Settings } from "@/types"; // adjust path to your types

function isAlreadyBooked(
  range: DateRange | undefined,
  datesArr: Date[],
): boolean {
  if (!range?.from || !range.to) return false;

  return datesArr.some((date) =>
    isWithinInterval(date, {
      start: range.from!,
      end: range.to!,
    }),
  );
}

type DateSelectorProps = {
  settings: Settings;
  bookedDates: Date[];
  cabin: Cabin;
};

function DateSelector({ settings, bookedDates, cabin }: DateSelectorProps) {
  const { range, setRange, resetRange } = useReservationContext();

  const { regularPrice, discount } = cabin;

  // SETTINGS
  const { minBookingLength, maxBookingLength } = settings;

  // Derived values — replace with your actual calculations
  const numNights =
    range?.from && range?.to
      ? Math.round(
          (range.to.getTime() - range.from.getTime()) / (1000 * 60 * 60 * 24),
        )
      : 0;

  const cabinPrice = numNights * (regularPrice - discount);

  const isBooked = isAlreadyBooked(range, bookedDates);

  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="pt-12 place-self-center"
        mode="range"
        onSelect={setRange}
        selected={range}
        min={minBookingLength + 1}
        max={maxBookingLength}
        fromMonth={new Date()}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 5}
        captionLayout="dropdown"
        numberOfMonths={1}
        disabled={[{ before: new Date() }, ...bookedDates]}
      />

      <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]">
        <div className="flex items-baseline gap-6">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}

            <span>/night</span>
          </p>

          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>

              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range?.from || range?.to ? (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold"
            onClick={resetRange}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
