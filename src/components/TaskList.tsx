import type { Task } from "../Types/Task";
import binIcon from "../bin.svg";

function ucFirst(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

type TaskListProps = {
  tasks: Task[];
  toggleComplete: (id: string) => () => void;
  handleDelete: (id: string) => () => void;
};

export function TaskList({
  tasks,
  toggleComplete,
  handleDelete,
}: TaskListProps) {
  // Group tasks by category
  const groupedTasks = tasks.reduce(
    (acc, task) => {
      const category = task.category;
      acc[category] = acc[category] || [];
      acc[category].push(task);
      return acc;
    },
    {} as Record<string, Task[]>,
  );

  if (!groupedTasks) return null;

  return (
    <>
      {Object.keys(groupedTasks).map((category) => {
        const categoryTitle = ucFirst(category);
        const categoryTasks = groupedTasks[category];

        if (!categoryTasks || !categoryTasks.length) return null;

        return (
          <div key={category}>
            <h2>{categoryTitle}</h2>
            <ul>
              {categoryTasks.map((task) => (
                <li className="flex items-center" key={task.id}>
                  <span
                    style={{
                      textDecoration: task.completed ? "line-through" : "none",
                    }}
                  >
                    {task.description}
                  </span>

                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={toggleComplete(task.id)}
                  />

                  <button
                    className="delete flex"
                    onClick={handleDelete(task.id)}
                  >
                    <img src={binIcon} alt="" />
                    Delete todo
                  </button>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </>
  );

  return <div className=""></div>;
}

export default TaskList;
