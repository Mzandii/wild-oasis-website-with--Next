import Link from "next/link";
import { Suspense } from "react";
import { GuestArea } from "./GuestArea";

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
