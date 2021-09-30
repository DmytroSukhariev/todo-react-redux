import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { State } from "state/common/types";

const initialState: State["searchQuery"] = "";

const searchQuerySlice = createSlice({
  name: "searchQuery",
  initialState,
  reducers: {
    setSearchQuery<T extends State["searchQuery"]>(
      _: unknown,
      { payload: query }: PayloadAction<T>
    ): T {
      return query;
    },
  },
});

export const selectSearchQuery = ({
  searchQuery,
}: State): State["searchQuery"] => searchQuery;

export const {
  reducer: searchQueryReducer,
  actions: { setSearchQuery },
} = searchQuerySlice;
