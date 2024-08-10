import { State } from "../hooks/useEngine";

export const Result = ({
  errors,
  wrm,
  total,
  className,
  state,
}: {
  errors: number;
  wrm: number;
  total: number;
  className: string;
  state: State;
}) => {
  if (state !== "finish") {
    return null;
  }
  return (
    <ul className={`flex flex-col items-center text-primary-400 space-y-3 ${className}`}>
      <li className="text-xl font-semibold">RESULTS</li>
      <li>WRM: {wrm}</li>
      <li className="text-red-500">Erors: {errors}</li>
      <li>Typed: {total}</li>
    </ul>
  );
};
