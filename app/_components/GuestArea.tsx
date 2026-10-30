import { getSession } from "../_lib/session";
import Image from "next/image";
import Link from "next/link";

export async function GuestArea() {
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
