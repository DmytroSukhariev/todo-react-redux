import _ from "lodash/fp";

import { State } from "state/common/types";

import { filterByCategory, filterBySearchQuery } from "./filters";

export const selectTodos = ({
  todos,
  searchQuery,
  category,
}: State): State["todos"] =>
  _.flow([filterByCategory(category), filterBySearchQuery(searchQuery)])(todos);
