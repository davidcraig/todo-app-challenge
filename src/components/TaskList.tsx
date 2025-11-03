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

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Completed</th>
            <th className="actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => {
            return (
              <tr
                style={{
                  textDecoration: task.completed ? "line-through" : "",
                }}
                key={task.id}
              >
                <td>{task.title}</td>
                <td>{ucFirst(task.category)}</td>
                <td>
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
        </tbody>
      </table>
    </>
  );
}

export default TaskList;
