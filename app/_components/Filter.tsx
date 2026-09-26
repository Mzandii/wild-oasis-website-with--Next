"use client";

import { Suspense } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export type FilterOption = {
  value: string;
  label: string;
};

type FilterProps = {
  filterField: string;
  options: FilterOption[];
  defaultValue?: string;
};

function FilterInner({ filterField, defaultValue, options }: FilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentFilter = searchParams.get(filterField) || defaultValue;

  function handleClick(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set(filterField, value);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="flex w-full justify-end gap-1 bg-transparent p-1">
      {options.map((option) => {
        const active = currentFilter === option.value;
        return (
          <button
            key={option.value}
            disabled={active}
            onClick={() => handleClick(option.value)}
            className={`rounded-sm px-3 py-3 my-5  text-sm font-medium transition-colors duration-300 ${
              active
                ? "bg-indigo-600 text-indigo-50"
                : "bg-transparent text-gray-700 hover:bg-indigo-600/10 hover:text-indigo-700"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

const Filter = (props: FilterProps) => (
  <Suspense fallback={null}>
    <FilterInner {...props} />
  </Suspense>
);

export default Filter;
