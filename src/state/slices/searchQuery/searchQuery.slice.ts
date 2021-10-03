import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { State } from "state/common/types";

const initialState: State["searchQuery"] = "";

const searchQuerySlice = createSlice({
  name: "searchQuery",
  initialState,
  reducers: {
    setSearchQuery<T extends State["searchQuery"]>(
      _: T,
      { payload: query }: PayloadAction<T>
    ): T {
      return query;
    },
    clearSearchQuery() {
      return initialState;
    },
  },
});

export const {
  reducer: searchQueryReducer,
  actions: { setSearchQuery, clearSearchQuery },
} = searchQuerySlice;
