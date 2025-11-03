import { test, expect, describe, vi, beforeEach } from "bun:test";
import { render, screen, fireEvent } from "@testing-library/react";
import type { Task } from "./Types/Task";
import App from "./App";

describe(App, () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks(); // or jest.restoreAllMocks()
  });

  test("loads tasks from localStorage on mount", () => {
    const storedTasks = [
      { id: "1", description: "Test task", category: "work", completed: false },
    ];
    localStorage.setItem("tasks", JSON.stringify(storedTasks));

    render(<App />);

    expect(screen.getByText("Test task")).not.toBeNull();
  });

  test("adds a task and saves to localStorage", () => {
    render(<App />);

    const input = screen.getByTestId("add-task-component-description");

    const categorySelect = screen.getByTestId(
      "add-task-component-category-select",
    );
    const submitButton = screen.getByTestId("add-task-component-submit-button");

    fireEvent.change(input, { target: { value: "New Task" } });
    fireEvent.change(categorySelect, { target: { value: "personal" } });
    fireEvent.click(submitButton);

    const stored = JSON.parse(localStorage.getItem("tasks") || "[]");
    expect(stored.some((t: Task) => t.description === "New Task")).toBe(true);
  });

  test("toggles task completion and updates localStorage", () => {
    const storedTasks = [
      { id: "1", description: "Toggle me", category: "work", completed: false },
    ];
    localStorage.setItem("tasks", JSON.stringify(storedTasks));

    render(<App />);
    const checkbox = screen.getAllByTestId("complete-todo-checkbox-1")[0];
    if (checkbox) {
      fireEvent.click(checkbox);
    } else {
      throw new Error("Checkbox not found");
    }

    const updated = JSON.parse(localStorage.getItem("tasks") || "[]");
    expect(updated[0].completed).toBe(true);
  });

  test("deletes task and updates localStorage", () => {
    const storedTasks = [
      { id: "1", description: "Delete me", category: "work", completed: false },
    ];
    localStorage.setItem("tasks", JSON.stringify(storedTasks));

    render(<App />);
    const deleteButton = screen.getByTestId("delete-todo-button-1");
    fireEvent.click(deleteButton);

    const updated = JSON.parse(localStorage.getItem("tasks") || "[]");
    expect(updated.length).toBe(0);
  });
});
