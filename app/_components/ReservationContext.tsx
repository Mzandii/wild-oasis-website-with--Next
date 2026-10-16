// app/_components/ReservationContext.tsx
"use client";

import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { DateRange } from "react-day-picker";

type ReservationContextType = {
  range: DateRange | undefined;
  setRange: Dispatch<SetStateAction<DateRange | undefined>>;
  resetRange: () => void;
};

const ReservationContext = createContext<ReservationContextType | undefined>(
  undefined,
);

export function ReservationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [range, setRange] = useState<DateRange | undefined>(undefined);
  const resetRange = () => setRange(undefined);

  return (
    <ReservationContext value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext>
  );
}

export function useReservation() {
  const context = useContext(ReservationContext); // React 19 also offers use(ReservationContext)
  if (!context)
    throw new Error("useReservation was used outside ReservationProvider");
  return context;
}
