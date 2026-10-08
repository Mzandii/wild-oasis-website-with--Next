import { getCabin, getCabins } from "@/app/_lib/data-service";
import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import type { Cabin } from "@/app/_lib/data-service";
import { notFound } from "next/navigation";

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

  const { name, maxCapacity, regularPrice, discount, image, description } =
    cabin as Cabin;

  const discountAmount = regularPrice - discount;
  const discountPercent = Math.round((discountAmount / regularPrice) * 100);

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <div className="grid grid-cols-[3fr_4fr] gap-20 border border-primary-800 py-3 px-10 mb-24">
        <div className="relative scale-[1.15] -translate-x-3">
          <Image
            src={image}
            fill
            className={"object-cover"}
            alt={`Cabin ${name}`}
          />
        </div>

        <div>
          <h3 className="text-accent-100 font-black text-7xl mb-5 -translate-x-63.5 bg-primary-950 p-6 pb-1 w-[150%]">
            Cabin {name}
          </h3>

          <p className="text-lg text-primary-300 mb-10">{description}</p>

          <ul className="flex flex-col gap-4 mb-7">
            <li className="flex gap-3 items-center">
              <UsersIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                For up to <span className="font-bold">{maxCapacity}</span>{" "}
                guests
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <MapPinIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                Located in the heart of the{" "}
                <span className="font-bold">Dolomites</span> (Italy)
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <EyeSlashIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                Privacy <span className="font-bold">100%</span> guaranteed
              </span>
            </li>
          </ul>

          {/* ✅ Price + discount section */}
          <div className="mt-8 flex items-center gap-4">
            {discount > 0 ? (
              <>
                <p className="text-3xl font-bold text-accent-400">
                  ${discount}
                </p>
                <p className="text-xl text-primary-400 line-through">
                  ${regularPrice}
                </p>
                <span className="rounded-md bg-accent-500 px-3 py-1 text-sm font-semibold text-primary-900">
                  Save {discountPercent}%
                </span>
              </>
            ) : (
              <p className="text-3xl font-bold text-accent-400">
                ${regularPrice}
              </p>
            )}
            <span className="text-primary-400">/ night</span>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-5xl font-semibold text-center">
          Reserve today. Pay on arrival.
        </h2>
      </div>
    </div>
  );
}
