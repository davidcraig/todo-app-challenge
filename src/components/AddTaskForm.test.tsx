import { test, expect, describe } from "bun:test";
import { render, screen } from "@testing-library/react";
import { AddTaskForm } from "./AddTaskForm";

describe(AddTaskForm, () => {
  test("renders AddTaskForm with default category of work", () => {
    render(<AddTaskForm onAddTask={() => {}} />);
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
