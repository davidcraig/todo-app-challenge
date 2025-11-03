import { test, expect, vi, describe } from "bun:test";
import { render, screen, fireEvent } from "@testing-library/react";
import { TaskList } from "./TaskList";
import type { Task } from "../Types/Task";

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Buy milk",
    category: "personal",
    completed: false,
  },
  {
    id: "2",
    title: "Finish report",
    category: "work",
    completed: true,
  },
];

describe(TaskList, () => {
  test("renders grouped categories with tasks", () => {
    render(
      <TaskList
        tasks={mockTasks}
        toggleComplete={() => () => {}}
        handleDelete={() => () => {}}
      />,
    );

    expect(screen.getAllByText("Personal")[0]).not.toBeNull();
    expect(screen.getAllByText("Work")[0]).not.toBeNull();
    expect(screen.getAllByText("Buy milk")[0]).not.toBeNull();
    expect(screen.getAllByText("Finish report")[0]).not.toBeNull();
  });

  test("calls toggleComplete when checkbox is clicked", () => {
    const toggleMock = vi.fn(() => vi.fn());

    render(
      <TaskList
        tasks={mockTasks}
        toggleComplete={toggleMock}
        handleDelete={() => () => {}}
      />,
    );

    const checkbox = screen.getAllByTestId(`complete-todo-checkbox-1`)[0];
    if (checkbox) {
      fireEvent.click(checkbox);
    } else {
      throw new Error("Checkbox not found");
    }

    expect(toggleMock).toHaveBeenCalledWith("1");
  });

  test("calls handleDelete when delete button is clicked", () => {
    const deleteMock = vi.fn(() => vi.fn());

    render(
      <TaskList
        tasks={mockTasks}
        toggleComplete={() => () => {}}
        handleDelete={deleteMock}
      />,
    );

    const deleteFirstItemButton =
      screen.getAllByTestId(`delete-todo-button-1`)[0];

    if (deleteFirstItemButton) {
      fireEvent.click(deleteFirstItemButton);
      expect(deleteMock).toHaveBeenCalledWith("1");
    } else {
      throw new Error("Delete button not found");
    }

    expect(deleteMock).toHaveBeenCalledWith("1");
  });
});
