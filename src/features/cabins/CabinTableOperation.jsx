import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import Sortby from "../../ui/Sortby";
export default function CabinTableOperation() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No Discount" },
          { value: "with-discount", label: "With Discount" },
        ]}
      />
      <Sortby
        options={[
          { value: "name-asc", label: "Sort by name (A-Z)" },
          { value: "name-desc", label: "Sort by name (Z-A)" },
          { value: "regularPrice-asc", label: "Sort by Price (low first))" },
          { value: "regularPrice-desc", label: "Sort by price (high first)" },
          { value: "maxCapacity-asc", label: "Sort by Capacity (low first)" },
          { value: "maxCapacity-desc", label: "Sort by Capacity (high first)" },
        ]}
      />
    </TableOperations>
  );
}
