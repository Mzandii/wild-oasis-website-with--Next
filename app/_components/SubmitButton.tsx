"use client";

import { useFormStatus } from "react-dom";
import type { ReactNode } from "react";

export default function SubmitButton({
  children,
  pendingLabel,
}: {
  children: ReactNode;
  pendingLabel: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="flex items-center gap-6 text-lg border border-primary-300 px-10 py-4 font-medium disabled:opacity-60"
    >
      {pending ? pendingLabel : children}
    </button>
  );
}
