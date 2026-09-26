import { BarLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="grid items-center justify-center">
      <BarLoader height={8} />
      <p className="tex-200 text-primary-200">cabin data loading</p>
    </div>
  );
}
