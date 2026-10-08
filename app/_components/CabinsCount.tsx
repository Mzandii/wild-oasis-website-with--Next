import { cacheLife, cacheTag } from "next/cache";
import { getCabins } from "../_lib/data-service";

export async function CabinsCount() {
  "use cache";
  cacheLife({ stale: 3600, revalidate: 7200, expire: 86400 });
  cacheTag("cabins");

  const cabins = await getCabins();
  return <span>{cabins.length}</span>;
}
