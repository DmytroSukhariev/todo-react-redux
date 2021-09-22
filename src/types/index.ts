export type TodoItem = {
  id: string;
  title: string;
  isDone: boolean;
  createdDate: Date;
  completedDate?: Date;
};

export enum Categories {
  ALL = "all",
  ACTIVE = "active",
  DONE = "done",
}
