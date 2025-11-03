import { test, expect, describe } from "bun:test";
import { render, screen } from "@testing-library/react";
import { AddTaskForm } from "./AddTaskForm";

describe(AddTaskForm, () => {
  test("renders AddTaskForm with default category of work", () => {
    render(<AddTaskForm onAddTask={() => {}} />);
    const categorySelect =
      screen.getByTestId<HTMLInputElement>("category-select");
    expect(categorySelect.value).toBe("work");
  });
});
