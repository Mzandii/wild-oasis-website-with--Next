"use client";

import { TrashIcon } from "@heroicons/react/24/solid";
import { useTransition } from "react";
import SpinnerMini from "@/app/_components/SpinnerMini";
import { DeleteReservationAction } from "@/app/_lib/crudActions";

type Props = {
  bookingId: number;
};

export default function DeleteReservation({ bookingId }: Props) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (!confirm("are you sure you want to delete the reservation?")) return;
    startTransition(async () => {
      await DeleteReservationAction({ bookingId });
    });
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
    >
      {isPending ? (
        <span className="mx-auto">
          <SpinnerMini />
        </span>
      ) : (
        <>
          <TrashIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
          <span className="mt-1">Delete</span>
        </>
      )}
    </button>
  );
}

// function DeleteReservation({ bookingId }: { bookingId: number }) {
//   return (
//     <form action={DeleteReservationAction.bind(null, { bookingId })}>
//       <DeleteButton />
//     </form>
//   );
// }

// function DeleteButton() {
//   const { pending } = useFormStatus();
//   return (
//     <button className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900">
//       <TrashIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
//       <span className="mt-1">{pending ? "Deleting" : "Delete"}</span>
//     </button>
//   );
// }

// export default DeleteReservation;
