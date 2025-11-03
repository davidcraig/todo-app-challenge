import "./index.css";
import { useState, useEffect } from "react";
import type { Task } from "./Types/Task";

import AddTaskForm from "./components/AddTaskForm";
import TaskList from "./components/TaskList";

const TASKS_STORAGE_KEY = "tasks";

export function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

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

  const toggleComplete = (id: string) => () => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task,
    );
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
  };

  const handleDelete = (id: string) => () => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  function onAddTask(task: Task) {
    task.id = crypto.randomUUID();
    const newTasks = [...tasks, task];
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(newTasks));

    setTasks(newTasks);
  }

  return (
    <div className="max-w-7xl mx-auto p-8 relative z-10">
      <div className="flex gap-8 mb-8"></div>

      <h1 className="text-5xl font-bold my-4 leading-tight">TODO App</h1>

      <div id="layout-container">
        <main>
          <h1>Task List</h1>

          <TaskList
            tasks={tasks}
            toggleComplete={toggleComplete}
            handleDelete={handleDelete}
          ></TaskList>
        </main>

        <aside>
          <AddTaskForm onAddTask={onAddTask}></AddTaskForm>
        </aside>
      </div>
    </div>
  );
}

export default App;
