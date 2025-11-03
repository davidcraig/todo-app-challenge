import type { Task } from "../Types/Task";
import binIcon from "../bin.svg";
import ObjectSortByKeys from "../util/ObjectSortByKeys";
import { ucFirst } from "../util/ucFirst";

type TaskListProps = {
  tasks: Task[];
  toggleComplete: (id: string) => () => void;
  handleDelete: (id: string) => () => void;
  selectedCategory: string;
};

export function TaskList({
  tasks,
  toggleComplete,
  handleDelete,
  selectedCategory,
}: TaskListProps) {
  // Group tasks by category
  //

  let filteredTasks =
    selectedCategory !== "all"
      ? tasks.filter((task) => task.category === selectedCategory)
      : tasks;

  return (
    <>
      <table data-testid="task-list">
        <thead>
          <tr>
            <th>Title</th>
            <th className="category">Category</th>
            <th className="completed">Completed</th>
            <th className="actions">Actions</th>
          </tr>
        </thead>
        <tbody data-testid="task-list-body">
          {filteredTasks.map((task) => {
            return (
              <tr
                style={{
                  textDecoration: task.completed ? "line-through" : "",
                }}
                key={task.id}
              >
                <td>{task.title}</td>
                <td className="category">{ucFirst(task.category)}</td>
                <td className="completed">
                  <input
                    type="checkbox"
                    data-testid={`complete-todo-checkbox-${task.id}`}
                    checked={task.completed}
                    onChange={toggleComplete(task.id)}
                    aria-label={`Complete todo ${task.title}`}
                  />
                </td>

                <td className="actions">
                  <button
                    data-testid={`delete-todo-button-${task.id}`}
                    className="delete flex"
                    onClick={handleDelete(task.id)}
                    aria-label={`Delete todo ${task.title}`}
                  >
                    <img src={binIcon} alt={`Delete todo ${task.title}`} />
                  </button>
                </td>
              </tr>
            );
          })}
          {filteredTasks.length == 0 && (
            <tr>
              <td className="p-4" colSpan={4}>
                No tasks found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}

export default TaskList;
