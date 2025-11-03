import "./index.css";
import "./tables.css";
import { useState, useEffect } from "react";
import type { Task } from "./Types/Task";

import AddTaskForm from "./components/AddTaskForm";
import TaskList from "./components/TaskList";

const TASKS_STORAGE_KEY = "tasks";
const DEFAULT_CATEGORY_KEY = "default_category";

export function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [defaultCategory, setDefaultCategory] = useState<string>("work");

  function loadTasks() {
    // Load tasks from API or local storage
    const tasks = localStorage.getItem(TASKS_STORAGE_KEY);
    if (tasks) {
      const parsedTasks = JSON.parse(tasks);
      // Process the parsed tasks as needed
      if (parsedTasks.length > 0) {
        setTasks(parsedTasks);
      }
    }
  }

  function loadDefaultCategory() {
    const category = localStorage.getItem(DEFAULT_CATEGORY_KEY);
    if (category) {
      setDefaultCategory(category);
    }
  }

  const toggleComplete = (id: string) => () => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task,
    );
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
  };

  const handleDelete = (id: string) => () => {
    const confirmedDelete = window.confirm(
      `Are you sure you want to delete this task?`,
    );

    if (!confirmedDelete) return;

    const updatedTasks = tasks.filter((task) => task.id !== id);
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
  };

  useEffect(() => {
    loadTasks();
    loadDefaultCategory();
  }, []);

  function onAddTask(task: Task) {
    const newTasks = [...tasks, task];
    localStorage.setItem(DEFAULT_CATEGORY_KEY, task.category);
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(newTasks));

    setTasks(newTasks);
  }

  return (
    <>
      <header className="flex items-center shadow-xl py-4">
        <h1 className="text-2xl ml-4 font-bold leading-tight">TODO App</h1>
        <h2 className="text-xl ml-8 font-bold">Organise your day!</h2>
      </header>
      <div className="mx-auto p-8 relative z-10">
        <div id="layout-container">
          <aside aria-label="Add Task Form">
            <AddTaskForm
              onAddTask={onAddTask}
              defaultCategory={defaultCategory}
            ></AddTaskForm>
          </aside>

          <main aria-labelledby="task-list-heading">
            <h1 id="task-list-heading">Tasks</h1>

            <TaskList
              tasks={tasks}
              toggleComplete={toggleComplete}
              handleDelete={handleDelete}
            ></TaskList>
          </main>
        </div>
      </div>
    </>
  );
}

export default App;
