import CabinList from "../_components/CabinList";
import { Suspense } from "react";
import Spinner from "../_components/Spinner";
import Filter from "../_components/Filter";

export const metadata = {
  title: "cabins ",
};

type PageProps = {
  searchParams: Promise<{ discount?: string }>;
};

export default async function Page({ searchParams }: PageProps) {
  const { discount } = await searchParams;

  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Cabins
      </h1>

      <Suspense>
        <Filter
          filterField="discount"
          defaultValue="all"
          options={[
            { value: "all", label: "All" },
            { value: "with-discount", label: "With Discount" },
            { value: "no-discount", label: "No Discount" },
          ]}
        />
      </Suspense>

      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>

      <Suspense fallback={<Spinner />}>
        <CabinList filter={discount} />
      </Suspense>
    </div>
  );
}
