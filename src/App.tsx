import "./index.css";
import "./tables.css";
import { useState, useEffect } from "react";
import type { Task } from "./Types/Task";

import AddTaskForm from "./components/AddTaskForm";
import TaskList from "./components/TaskList";
import { TaskListFilter } from "./components/TaskListFilter";

const TASKS_STORAGE_KEY = "tasks";
const DEFAULT_CATEGORY_KEY = "default_category";
const DEFAULT_CATEGORY = "work";
const CATEGORIES = ["work", "personal", "shopping", "household", "finances"];

export function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [defaultCategory, setDefaultCategory] =
    useState<string>(DEFAULT_CATEGORY);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

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

    setDefaultCategory(task.category);
    setTasks(newTasks);
  }

  function increaseFontSize() {
    const html = document.documentElement;
    const currentFontSize = parseInt(
      window.getComputedStyle(html, "font-size").fontSize,
    );
    const newFontSize = currentFontSize + 2;
    html.style.fontSize = `${newFontSize}px`;
  }

  function decreaseFontSize() {
    const html = document.documentElement;
    const currentFontSize = parseInt(
      window.getComputedStyle(html, "font-size").fontSize,
    );
    const newFontSize = currentFontSize - 2;
    html.style.fontSize = `${newFontSize}px`;
  }

  return (
    <>
      <header className="flex md:items-center shadow-xl py-4">
        <h1 className="text-2xl ml-4 font-bold leading-tight">TODO App</h1>
        <h2 className="text-xl ml-4 md:ml-8 font-bold">Organise your day!</h2>
        <div className="ml-4 mt-4 md:mt-0 md:ml-auto mr-8">
          <button
            aria-label="Decrease Font Size"
            onClick={decreaseFontSize}
            className="mr-1 p-0"
          >
            a-
          </button>
          <button
            aria-label="Increase Font Size"
            className="ml-2 p-0"
            onClick={increaseFontSize}
          >
            A+
          </button>
        </div>
      </header>
      <div className="mx-auto p-8 relative z-10">
        <div id="layout-container">
          <aside aria-label="Add Task Form">
            <AddTaskForm
              onAddTask={onAddTask}
              categories={CATEGORIES}
              defaultCategory={defaultCategory}
            ></AddTaskForm>
          </aside>

          <main aria-labelledby="task-list-heading">
            <div className="flex flex-col md:flex-row">
              <h1 id="task-list-heading">Tasks</h1>
              <TaskListFilter
                categories={CATEGORIES}
                setSelectedCategory={setSelectedCategory}
              />
            </div>

            <TaskList
              tasks={tasks}
              toggleComplete={toggleComplete}
              handleDelete={handleDelete}
              selectedCategory={selectedCategory}
            ></TaskList>
          </main>
        </div>
      </div>
    </>
  );
}

export default App;
