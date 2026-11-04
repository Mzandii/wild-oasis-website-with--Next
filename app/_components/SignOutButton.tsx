"use client";

import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/solid";
import { signOutAction } from "../_lib/actions";
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="py-3 px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200 w-full disabled:opacity-50"
    >
      <ArrowRightStartOnRectangleIcon className="h-5 w-5 text-primary-600" />
      <span>{pending ? "Signing out..." : "Sign out"}</span>
    </button>
  );
}

function SignOutButton() {
  return (
    <form action={signOutAction}>
      <SubmitButton />
    </form>
  );
}

export default SignOutButton;
