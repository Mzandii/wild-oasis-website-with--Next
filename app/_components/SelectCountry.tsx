import { getCountries, type Country } from "@/app/_lib/data-service";
import { JSX } from "react/jsx-runtime";

interface SelectCountryProps {
  defaultCountry?: string;
  name: string;
  id: string;
  className?: string;
}

async function SelectCountry({
  defaultCountry,
  name,
  id,
  className,
}: SelectCountryProps): Promise<JSX.Element> {
  const countries: Country[] = await getCountries();

  // Find the country matching defaultCountry by common name
  const defaultMatch: Country | undefined = countries.find(
    (c) => c.names.common === defaultCountry,
  );
  const flag: string = defaultMatch?.flag?.url_svg ?? "";

  return (
    <select
      name={name}
      id={id}
      defaultValue={defaultCountry ? `${defaultCountry}%${flag}` : ""}
      className={className}
    >
      <option value="">Select country...</option>
      {countries.map((c) => (
        <option
          key={c.codes.alpha_2}
          value={`${c.names.common}%${c.flag.url_svg}`}
        >
          {c.names.common}
        </option>
      ))}
    </select>
  );
}

export default SelectCountry;
