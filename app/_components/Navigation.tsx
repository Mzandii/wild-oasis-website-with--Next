import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { getSession } from "@/app/_lib/session";

async function GuestArea() {
  const session = await getSession();

  if (session?.user) {
    const { name, image } = session.user;
    return (
      <Link
        href="/account"
        className="hover:text-accent-400 transition-colors flex items-center gap-4"
      >
        {image && (
          <Image
            src={image}
            alt={name}
            width={32}
            height={32}
            className="rounded-full"
            referrerPolicy="no-referrer"
          />
        )}
        <span>Guest area</span>
      </Link>
    );
  }

  return (
    <Link href="/account" className="hover:text-accent-400 transition-colors">
      Guest area
    </Link>
  );
}

export default function Navigation() {
  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <li>
          <Link href="/cabins">Cabins</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Suspense fallback={<span className="opacity-60">Guest area</span>}>
            <GuestArea />
          </Suspense>
        </li>
      </ul>
    </nav>
  );
}
