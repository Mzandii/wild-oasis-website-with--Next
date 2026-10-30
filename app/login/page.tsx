import type { Metadata } from "next";
import { Suspense } from "react";
import SignInButton from "@/app/_components/SignInButton";
import { getSession } from "@/app/_lib/session";
import { safeNext } from "@/app/_lib/utils";
import { redirect } from "next/navigation";

export const metadata: Metadata = { title: "Login" };

type Props = {
  searchParams: Promise<{ next?: string; error?: string }>;
};

export default function Page({ searchParams }: Props) {
  return (
    <div className="flex flex-col gap-10 mt-10 items-center">
      <h2 className="text-3xl font-semibold">
        Sign in to access your guest area
      </h2>
      <Suspense fallback={null}>
        <LoginContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function LoginContent({ searchParams }: Props) {
  const { next, error } = await searchParams;

  const session = await getSession();
  if (session) redirect(safeNext(next));

  return (
    <>
      {error && (
        <p role="alert" className="text-red-400">
          Sign-in failed. Please try again.
        </p>
      )}
      <SignInButton next={next} />
    </>
  );
}
