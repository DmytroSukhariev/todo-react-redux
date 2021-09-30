export type Timestamp = number;

export type TodoItem = {
  id: string;
  title: string;
  isDone: boolean;
  createdDate: Timestamp;
  completedDate?: Timestamp;
};

export enum Categories {
  ALL = "all",
  ACTIVE = "active",
  DONE = "done",
}
