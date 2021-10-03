import { State } from "state/common/types";

export const selectSearchQuery = ({
  searchQuery,
}: State): State["searchQuery"] => searchQuery;
