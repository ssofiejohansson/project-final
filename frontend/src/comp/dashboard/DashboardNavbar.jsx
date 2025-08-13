export const DashboardNavbar = ({ filterCategory, setFilterCategory, sortKey, setSortKey }) => {
  return (
    <div className="flex gap-4 flex-wrap items-center py-4">

      <select
        value={filterCategory}
        onChange={(e) => setFilterCategory(e.target.value)}
        className="border rounded px-2 py-1"
      >
        <option value="">Filter by category</option>
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
      </select>
    </div>
  )
}