import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import type { Cabin } from "@/app/_lib/data-service";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";
import { getSession } from "../_lib/session";
import LoginMessage from "./LoginMessage";

async function Reservation({ cabin }: { cabin: Cabin }) {
  const session = await getSession();
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);

  return (
    <div>
      <div className="grid grid-cols-2 border border-primary-800 min-h-[400px]">
        <DateSelector
          settings={settings}
          bookedDates={bookedDates}
          cabin={cabin}
        />
        {session?.user ? (
          <ReservationForm
            cabin={cabin}
            user={{
              name: session.user.name,
              image: session.user.image ?? null,
            }}
          />
        ) : (
          <LoginMessage />
        )}
      </div>
    </div>
  );
}

export default Reservation;
