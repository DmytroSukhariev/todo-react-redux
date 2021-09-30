import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash/fp";
import { v4 as uuid } from "uuid";

import { Categories, TodoItem } from "types";
import { State } from "state/common/types";

const initialState: State["todos"] = [];

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addNewTodo(
      todos,
      { payload: title }: PayloadAction<TodoItem["title"]>
    ): void {
      if (_.isNil(title)) return;
      todos.push({
        title,
        createdDate: new Date().getTime(),
        isDone: false,
        id: uuid(),
      });
    },
    removeTodo(todos, { payload: id }: PayloadAction<TodoItem["id"]>): void {
      const index = todos.findIndex(({ id: _id }) => _id === id);
      if (index >= 0) todos.splice(index, 1);
    },
    toggleDoneTodo(
      todos,
      { payload: id }: PayloadAction<TodoItem["id"]>
    ): void {
      const todo = todos.find(({ id: _id }) => _id === id);
      if (_.isNil(todo)) return;
      const newIsDone = !todo.isDone;
      todo.isDone = newIsDone;
      if (newIsDone) todo.completedDate = new Date().getTime();
    },
  },
});

const filterByCategory = (category: Categories) => (todos: Array<TodoItem>) => {
  switch (category) {
    case Categories.ALL:
      return todos;
    case Categories.ACTIVE:
      return todos.filter(({ isDone }) => !isDone);
    case Categories.DONE:
      return todos.filter(({ isDone }) => isDone);
    default:
      console.error(`Unhandled category: ${category}`);
      return todos;
  }
};

const filterBySearchQuery = (searchQuery: string) => (todos: Array<TodoItem>) =>
  _.isEmpty(searchQuery)
    ? todos
    : todos.filter(
        ({ title }) =>
          title.toLowerCase().search(searchQuery.toLowerCase()) >= 0
      );

export const selectTodos = ({
  todos,
  searchQuery,
  category,
}: State): State["todos"] =>
  _.flow([filterByCategory(category), filterBySearchQuery(searchQuery)])(todos);

export const {
  reducer: todosReducer,
  actions: { addNewTodo, removeTodo, toggleDoneTodo },
} = todosSlice;
