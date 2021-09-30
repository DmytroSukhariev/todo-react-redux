import { Categories, TodoItem } from "types";

export type State = {
  todos: TodoItem[];
  category: Categories;
  searchQuery: string;
  isTodoModalVisible: boolean;
};
