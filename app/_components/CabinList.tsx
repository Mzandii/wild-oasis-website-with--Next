import CabinCard from "@/app/_components/CabinCard";
import { getCabins } from "@/app/_lib/data-service";

type CabinListProps = {
  filter?: string;
};

export default async function CabinList({ filter }: CabinListProps) {
  const cabins = await getCabins();

  // const ids = cabins.reduce<number[]>((accu, el) => {
  //   accu.push(el.id);
  //   return accu;
  // }, []);

  // // [97, 1, 120, 119, 118, 91, 92, 111, 116]  console.log(ids)

  if (!cabins.length) return null;

  const filteredCabins =
    !filter || filter === "all"
      ? cabins
      : cabins.filter((cabin) =>
          filter === "with-discount"
            ? cabin.discount > 0
            : cabin.discount === 0,
        );

  return (
    <div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
        {filteredCabins.map((cabin) => (
          <CabinCard cabin={cabin} key={cabin.id} />
        ))}
      </div>
    </div>
  );
}
