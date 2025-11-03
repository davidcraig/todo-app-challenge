import type { Task } from "../Types/Task";
import binIcon from "../bin.svg";
import ObjectSortByKeys from "../util/ObjectSortByKeys";

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
  const groupedTasks = ObjectSortByKeys(
    tasks.reduce(
      (acc, task) => {
        const category = task.category;
        acc[category] = acc[category] || [];
        acc[category].push(task);
        return acc;
      },
      {} as Record<string, Task[]>,
    ),
  );

  console.log(groupedTasks);

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
              {categoryTasks.map((task: Task) => (
                <li className="flex items-center" key={task.id}>
                  <span
                    style={{
                      textDecoration: task.completed ? "line-through" : "none",
                    }}
                  >
                    {task.title}
                  </span>

                  <input
                    type="checkbox"
                    data-testid={`complete-todo-checkbox-${task.id}`}
                    checked={task.completed}
                    onChange={toggleComplete(task.id)}
                  />

                  <button
                    data-testid={`delete-todo-button-${task.id}`}
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
}

export default TaskList;
