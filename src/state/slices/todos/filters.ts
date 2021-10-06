import _ from "lodash/fp";

import { Categories, TodoItem } from "types";

export const filterByCategory =
  (category: Categories) => (todos: Array<TodoItem>) => {
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

export const filterBySearchQuery =
  (searchQuery: string) => (todos: Array<TodoItem>) =>
    _.isEmpty(searchQuery)
      ? todos
      : todos.filter(
          ({ title }) =>
            title.toLowerCase().search(searchQuery.toLowerCase()) >= 0
        );
