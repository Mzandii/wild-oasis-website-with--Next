import Cabind from "@/app/_components/Cabin";
import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import type { Cabin } from "@/app/_lib/data-service";
import { getCabin, getCabins } from "@/app/_lib/data-service";
import { notFound } from "next/navigation";
import { Suspense } from "react";

type PageProps = {
  params: Promise<{ cabinId: number }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { cabinId } = await params;
  const cabin = await getCabin(Number(cabinId));
  const { name } = cabin as Cabin;
  return {
    title: `cabin ${name}`,
  };
}

export async function generateStaticParams() {
  const cabins = await getCabins();
  const ids = cabins.map((el) => ({ cabinId: String(el.id) }));
  return ids;
}

export default async function Page({ params }: PageProps) {
  const { cabinId } = await params;
  const cabin = await getCabin(cabinId);

  if (!cabin) notFound();

  const { name } = cabin as Cabin;

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabind cabin={cabin} />
      <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
        Reserve {name} today. Pay on arrival.
      </h2>
      <Suspense fallback={<Spinner />}>
        <Reservation cabin={cabin} />
      </Suspense>
    </div>
  );
}
