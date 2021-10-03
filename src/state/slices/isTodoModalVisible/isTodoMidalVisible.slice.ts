import { createSlice } from "@reduxjs/toolkit";
import { State } from "state/common/types";

const initialState: State["isTodoModalVisible"] = false;

const isTodoModalVisibleSlice = createSlice({
  name: "isTodoModalVisible",
  initialState,
  reducers: {
    showTodoModal(): true {
      return true;
    },
    hideTodoModal(): false {
      return false;
    },
  },
});

export const {
  reducer: isTodoModalVisibleReducer,
  actions: { showTodoModal, hideTodoModal },
} = isTodoModalVisibleSlice;
