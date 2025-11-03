export type Task = {
  id: string;
  description: string;
  completed: boolean;
  category: string;
};

export type TaskFormProps = {
  onAddTask: (task: Task) => void;
};
