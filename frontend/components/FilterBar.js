'use client';

export default function FilterBar({ onFilter }) {
  return (
    <div className="mb-4 flex gap-4">
      <select onChange={(e) => onFilter(e.target.value)}>
        <option value="">All</option>
        <option value="pending">Pending</option>
        <option value="running">Running</option>
        <option value="completed">Completed</option>
      </select>
    </div>
  );
}
