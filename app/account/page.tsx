import { getCurrentGuest } from "../_lib/session";

export const metadata = {
  title: "account",
};

export default async function Account() {
  const currentGuest = await getCurrentGuest();
  return (
    <div>
      <h1> Welcome, {currentGuest.fullName.split(" ").at(0)}</h1>
    </div>
  );
}
