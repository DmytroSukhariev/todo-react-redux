import { State } from "state/common/types";

export const selectCategory = ({ category }: State): State["category"] =>
  category;
