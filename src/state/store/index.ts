import { configureStore, combineReducers } from "@reduxjs/toolkit";

import { todosReducer } from "state/slices/todos";
import { categoryReducer } from "state/slices/category";
import { searchQueryReducer } from "state/slices/searchQuery";
import { isTodoModalVisibleReducer } from "state/slices/isTodoModalVisible";

export type AppDispatch = typeof store.dispatch;

const storeConfigOptions = {
  reducer: combineReducers({
    todos: todosReducer,
    category: categoryReducer,
    searchQuery: searchQueryReducer,
    isTodoModalVisible: isTodoModalVisibleReducer,
  }),
};

export const store = configureStore(storeConfigOptions);
