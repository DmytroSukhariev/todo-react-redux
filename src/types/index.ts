export type TodoItem = {
  id: string;
  title: string;
  done: boolean;
  createdDate: Date;
  completionDate?: Date;
};

export enum Categories {
  ALL = "all",
  ACTIVE = "active",
  DONE = "done",
}
