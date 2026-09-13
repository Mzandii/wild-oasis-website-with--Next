import Link from "next/link";

export default function Navigation() {
  return (
    <ul>
      <li>
        <Link href="/"> HOME</Link>
      </li>
      <li>
        <Link href="/cabins"> CABINS</Link>
      </li>
      <li>
        <Link href="/about"> ABOUT</Link>
      </li>
      <li>
        <Link href="/account"> ACCOUNT</Link>
      </li>
    </ul>
  );
}
