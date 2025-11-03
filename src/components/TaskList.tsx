import type { Task } from "../Types/Task";

function ucFirst(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

type TaskListProps = {
  tasks: Task[];
  toggleComplete: (id: string) => () => void;
};

export function TaskList({ tasks, toggleComplete }: TaskListProps) {
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
              {categoryTasks.map((task) => (
                <li
                  style={{
                    textDecoration: task.completed ? "line-through" : "none",
                  }}
                  key={task.id}
                >
                  {task.description}
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={toggleComplete(task.id)}
                  />
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
