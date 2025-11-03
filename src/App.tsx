import "./index.css";
import type { Task } from "./Types/Task";

import AddTaskForm from "./components/AddTaskForm";

export function App() {
  function onAddTask(task: Task) {
    console.log(task);
  }

  return (
    <div className="max-w-7xl mx-auto p-8 relative z-10">
      <div className="flex gap-8 mb-8"></div>

      <h1 className="text-5xl font-bold my-4 leading-tight">TODO App</h1>

      <div
        id="layout-container"
        style={{
          display: "grid",
          gap: "2rem",
          gridTemplateColumns: "80% 1fr",
        }}
      >
        <main>
          <h1>Tasks</h1>
        </main>

        <aside>
          <AddTaskForm onAddTask={onAddTask}></AddTaskForm>
        </aside>
      </div>
    </div>
  );
}

export default App;
