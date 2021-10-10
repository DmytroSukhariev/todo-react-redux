export { store } from "state/store";

export { selectCategory, setCategory } from "state/slices/category";
export {
  selectTodos,
  removeTodo,
  addNewTodo,
  toggleDoneTodo,
} from "state/slices/todos";
export {
  selectSearchQuery,
  setSearchQuery,
  clearSearchQuery,
} from "state/slices/searchQuery";
export {
  selectIsTodoModalVisible,
  showTodoModal,
  hideTodoModal,
} from "state/slices/isTodoModalVisible";
export * from "state/hooks";
