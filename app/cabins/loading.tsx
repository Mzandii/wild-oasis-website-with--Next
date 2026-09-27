import { BarLoader } from "react-spinners";
import Spinner from "../_components/Spinner";

export default function Loading() {
  return (
    <div className="grid items-center justify-center">
      <Spinner />
      <p className="tex-200 text-primary-200">cabin data loading</p>
    </div>
  );
}
