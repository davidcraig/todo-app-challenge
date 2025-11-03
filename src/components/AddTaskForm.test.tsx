import { test, expect, describe } from "bun:test";
import { render, screen } from "@testing-library/react";
import { AddTaskForm } from "./AddTaskForm";
import type { Task } from "@/Types/Task";

const categories = ["all", "work"];

describe(AddTaskForm, () => {
  test("renders AddTaskForm with default category of work", () => {
    render(
      <AddTaskForm
        defaultCategory="work"
        categories={categories}
        onAddTask={(task: Task) => {}}
      />,
    );
    const categorySelect = screen.getAllByTestId<HTMLInputElement>(
      "add-task-component-category-select",
    )[0];

    if (categorySelect) {
      expect(categorySelect.value).toBe("work");
    } else {
      throw new Error("Category select element not found");
    }
  });
});
