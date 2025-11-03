export type Task = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
};

export type TaskFormProps = {
  onAddTask: (task: Task) => void;
};
