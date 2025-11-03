import { useState, useRef } from "react";
import type { TaskFormProps } from "../Types/Task";

export function AddTaskForm({ onAddTask }: TaskFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [newTask, setNewTask] = useState({
    description: "",
    category: "work",
    completed: false,
  });

  const handleCompletedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask({ ...newTask, completed: e.target.checked });
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask({ ...newTask, description: e.target.value });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNewTask({ ...newTask, category: e.target.value });
  };

  const resetForm = () => {
    setNewTask({
      description: "",
      category: "work",
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
    <div className="">
      <h1>Add Task</h1>

      <form ref={formRef} onSubmit={handleSubmit}>
        <label>
          Task Description:
          <input
            type="text"
            className="input"
            minLength={3}
            value={newTask.description}
            onChange={handleDescriptionChange}
          />
        </label>

        <label>
          Task Category:
          <select
            data-testid="category-select"
            value={newTask.category}
            onChange={handleCategoryChange}
          >
            <option value="work">Work</option>
            <option value="personal">Personal</option>
            <option value="finances">Finances</option>
            <option value="household">Household</option>
            <option value="other">Other</option>
          </select>
        </label>

        <label>
          Completed?:
          <input
            id="addTaskForm-completed"
            type="checkbox"
            checked={newTask.completed}
            onChange={handleCompletedChange}
          />
        </label>

        <button type="submit" className="save">
          Save Task
        </button>
      </form>
    </div>
  );
}

export default AddTaskForm;
