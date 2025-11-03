export type Task = {
  id: `${string}-${string}-${string}-${string}-${string}`;
  title: string;
  completed: boolean;
  category: string;
};

export type TaskFormProps = {
  onAddTask: (task: Task) => void;
  defaultCategory: string;
  categories: string[];
};
