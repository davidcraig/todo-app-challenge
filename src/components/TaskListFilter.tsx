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
      className="md:w-4/12"
      style={{ marginLeft: "auto" }}
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
