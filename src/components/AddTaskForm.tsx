import { useState, useRef } from "react";
import type { TaskFormProps } from "../Types/Task";

export function AddTaskForm({
  onAddTask,
  defaultCategory,
  categories,
}: TaskFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [newTask, setNewTask] = useState({
    id: crypto.randomUUID(),
    title: "",
    category: "work",
    completed: false,
  });

  const handleCompletedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask({ ...newTask, completed: e.target.checked });
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask({ ...newTask, title: e.target.value });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNewTask({ ...newTask, category: e.target.value });
  };

  const resetForm = () => {
    setNewTask({
      id: crypto.randomUUID(),
      title: "",
      category: defaultCategory,
      completed: false,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = formRef.current;
    if (form === null) return;

    if (form.checkValidity()) {
      resetForm();
      onAddTask(newTask);
    } else {
      form.reportValidity();
    }
  };

  return (
    <div id="add-task-form" className="shadow-2xl border p-4">
      <h1>Add Task</h1>

      <form className="flex flex-col" ref={formRef} onSubmit={handleSubmit}>
        <label>
          Task Description:
          <input
            autoFocus={true}
            type="text"
            data-testid="add-task-component-description"
            className="input"
            required
            minLength={3}
            value={newTask.title}
            onChange={handleTitleChange}
          />
        </label>

        <label>
          Task Category:
          <select
            data-testid="add-task-component-category-select"
            value={newTask.category}
            onChange={handleCategoryChange}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <label>
          Completed?:
          <input
            data-testid="add-task-component-completed-checkbox"
            type="checkbox"
            checked={newTask.completed}
            onChange={handleCompletedChange}
          />
        </label>

        <button
          data-testid="add-task-component-submit-button"
          type="submit"
          className="save mt-4"
        >
          Add Task
        </button>
      </form>
    </div>
  );
}

export default AddTaskForm;
