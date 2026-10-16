"use client";

import { useState } from "react";
import { DayPicker, type DateRange } from "react-day-picker";
import "react-day-picker/style.css";

export default function DateSelectort() {
  const [range, setRange] = useState<DateRange | undefined>();

  const resetRange = () => setRange(undefined);

  return (
    <DayPicker
      mode="range"
      selected={range}
      onSelect={setRange}
      min={2}
      max={23}
      startMonth={new Date()}
      endMonth={new Date(new Date().getFullYear() + 5, 0, 1)}
      disabled={{ before: new Date() }}
      captionLayout="dropdown"
      numberOfMonths={2}
    />
  );
}
