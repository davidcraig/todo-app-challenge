import ucFirst from "@/util/ucFirst";

export function TaskListFilter({
  categories,
  setSelectedCategory,
}: {
  categories: string[];
  setSelectedCategory: (category: string) => void;
}) {
  return (
    <select
      aria-label="Task Category Filter"
      style={{ marginLeft: "auto", maxWidth: "30%" }}
      onChange={(e) => setSelectedCategory(e.target.value)}
    >
      <option value="all">All</option>
      {categories.map((category) => (
        <option key={category} value={category}>
          {ucFirst(category)}
        </option>
      ))}
    </select>
  );
}
