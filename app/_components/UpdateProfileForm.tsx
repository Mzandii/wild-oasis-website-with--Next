"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import SubmitButton from "@/app/_components/SubmitButton";
import type { Guest } from "../_lib/data-service";
import { updateGuestProfileAction } from "../_lib/updateGuestProfileAction";

const UpdateProfileForm = ({
  guest,
  children,
}: {
  guest: Guest;
  children: ReactNode;
}) => {
  const { fullName, email, nationalID, countryFlag } = guest;

  return (
    <form
      className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
      action={updateGuestProfileAction}
    >
      <div className="space-y-2">
        <label>Full name</label>
        <input
          disabled
          defaultValue={fullName}
          name="fullName"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <label>Email address</label>
        <input
          disabled
          defaultValue={email}
          name="email"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="nationality">Where are you from?</label>
          {countryFlag && (
            <Image
              src={countryFlag}
              alt="Country flag"
              width={40}
              height={27}
            />
          )}
        </div>
        <div> {children}</div>
      </div>

      <div className="space-y-2">
        <label htmlFor="nationalID">National ID number</label>
        <input
          defaultValue={nationalID ?? ""}
          name="nationalID"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
        />
      </div>

      <div className="flex justify-end items-center gap-6">
        <SubmitButton pendingLabel="Updating...">Update profile</SubmitButton>
      </div>
    </form>
  );
};

export default UpdateProfileForm;
