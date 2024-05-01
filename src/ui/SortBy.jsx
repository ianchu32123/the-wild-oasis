import { useSearchParams } from "react-router-dom";
import Select from "./Select";

export default function Sortby({ options }) {
  const [searchParams, setsearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "";
  function handleChange(e) {
    searchParams.set("sortBy", e.target.value);
    setsearchParams(searchParams);
  }
  return (
    <Select
      options={options}
      type="white"
      value={sortBy}
      onChange={handleChange}
    />
  );
}
