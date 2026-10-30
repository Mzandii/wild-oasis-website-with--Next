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
      className="flex items-center gap-6 text-lg border border-primary-300 px-10 py-4 font-medium text-primary-800 transition-colors duration-200 hover:text-primary-950 hover:border-primary-500 hover:bg-primary-50 disabled:opacity-60 disabled:hover:bg-transparent disabled:hover:text-primary-800 disabled:hover:border-primary-300"
    >
      {pending ? pendingLabel : children}
    </button>
  );
}
