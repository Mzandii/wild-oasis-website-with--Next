import CabinCard from "@/app/_components/CabinCard";
import { getCabins } from "@/app/_lib/data-service";

type CabinListProps = {
  filter?: string;
};

const capacityFilters: Record<string, (capacity: number) => boolean> = {
  small: (capacity) => capacity < 3,
  medium: (capacity) => capacity >= 3 && capacity <= 7,
  large: (capacity) => capacity >= 8,
};

export default async function CabinList({ filter = "all" }: CabinListProps) {
  const cabins = await getCabins();

  if (!cabins.length) return null;

  const filterFn = capacityFilters[filter];

  const filteredCabins = filterFn
    ? cabins.filter((cabin) => filterFn(cabin.maxCapacity))
    : cabins; // "all" or unknown filter → show everything

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {filteredCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}
