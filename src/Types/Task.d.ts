export type Task = {
  id: string;
  title: string;
  completed: boolean;
  category: string;
};

export type TaskFormProps = {
  onAddTask: (task: Task) => void;
  defaultCategory: (string) => void;
};
