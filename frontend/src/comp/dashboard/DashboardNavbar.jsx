import { PlusIcon } from "@heroicons/react/24/outline";
import { Btn } from "../../comp/layout/Btn";

export const DashboardNavbar = ({
  filterCategory,
  setFilterCategory,
  sortKey,
  setSortKey,
  onAdd,
}) => {
  return (
    <div id="dashboard" className="flex gap-4 flex-wrap items-center py-4">
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
      <Btn
        variant="text"
        size="md"
        className="mr-2 flex items-center gap-2 ml-auto"
        onClick={onAdd}
      >
        <PlusIcon strokeWidth={3} className="h-5 w-5" />
        ADD
      </Btn>
    </div>
  );
};
