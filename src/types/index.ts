export type TodoItem = {
  id: string;
  title: string;
  done: boolean;
  createdDate: Date;
  completionDate?: Date;
};
