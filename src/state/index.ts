import { useDispatch as uD } from "react-redux";

export { store } from "state/store";

export { selectCategory, setCategory } from "state/slices/category";
export {
  selectTodos,
  removeTodo,
  addNewTodo,
  toggleDoneTodo,
} from "state/slices/todos";
export { selectSearchQuery, setSearchQuery } from "state/slices/searchQuery";
export {
  selectIsTodoModalVisible,
  showTodoModal,
  hideTodoModal,
} from "state/slices/isTodoModalVisible";

// eslint-disable-next-line
export const useDispatch = () => uD<import("state/store").AppDispatch>();
