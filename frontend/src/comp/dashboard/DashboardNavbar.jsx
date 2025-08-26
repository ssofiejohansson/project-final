import { PlusIcon } from "@heroicons/react/24/outline";
import { Btn, BtnSmall } from "../../comp/layout/Btn";

export const DashboardNavbar = ({
  filterCategory,
  setFilterCategory,
  sortKey,
  setSortKey,
  onAdd,
}) => {
  return (
    <div className="flex gap-4 flex-wrap items-center py-4">
      <select
        value={filterCategory}
        onChange={(e) => setFilterCategory(e.target.value)}
        className="border rounded px-2 py-1"
      >
        <option value="">All categories</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Food">Food</option>
        <option value="Health">Health</option>
        <option value="Learning">Learning</option>
        <option value="Other">Other</option>
      </select>

      <select
        value={sortKey}
        onChange={(e) => setSortKey(e.target.value)}
        className="border rounded px-2 py-1"
      >
        <option value="">Sort by</option>
        <option value="name">Name (A-Z)</option>
        <option value="cost">Cost (Low to High)</option>
        <option value="reminderDate">Reminder Date (Earliest First)</option>
        <option value="status">Status (Active First)</option>
      </select>

      {/* Add button */}
      <BtnSmall
        variant="text"
        size="sm"
        className="flex items-center gap-2"
        onClick={onAdd} // trigger parent handler
      >
        <PlusIcon strokeWidth={3} className="h-4 w-4" />
        ADD
      </BtnSmall>
    </div>
  );
};
