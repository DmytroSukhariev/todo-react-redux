import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash/fp";
import { v4 as uuid } from "uuid";

import { TodoItem } from "types";
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

export const {
  reducer: todosReducer,
  actions: { addNewTodo, removeTodo, toggleDoneTodo },
} = todosSlice;
