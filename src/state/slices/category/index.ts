import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Categories } from "types";
import { State } from "state/common/types";

const initialState = Categories.ALL;

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategory(_, { payload: newCategory }: PayloadAction<State["category"]>) {
      return newCategory;
    },
  },
});

export const selectCategory = ({ category }: State): State["category"] =>
  category;

export const {
  reducer: categoryReducer,
  actions: { setCategory },
} = categorySlice;
