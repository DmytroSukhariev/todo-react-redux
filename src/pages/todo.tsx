import React, { useEffect, useState } from "react";
import { Alert } from "rsuite";
import _ from "lodash/fp";

import { Categories, TodoItem } from "types";
import { cutStringIfNeeded } from "utils";

import { ControlPanel } from "components/control-panel";
import { TodoList } from "components/todo-list";

export const Todo: React.FC = () => {
  const [todos, setTodos] = useState<Array<TodoItem>>([]);
  const [category, setCategory] = useState<Categories>(Categories.ALL);
  const [displayTodos, setDisplayTodos] = useState<Array<TodoItem>>(todos);
  const [newTodoModalShown, setNewTodoModalShown] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const doneLength = todos.reduce(
    (count, { isDone }) => (isDone ? count + 1 : count),
    0
  );

  const filterByCategory =
    (category: Categories) => (todos: Array<TodoItem>) => {
      switch (category) {
        case Categories.ALL:
          return todos;
        case Categories.ACTIVE:
          return todos.filter(({ isDone }) => !isDone);
        case Categories.DONE:
          return todos.filter(({ isDone }) => isDone);
      }
    };

  const filterBySearchQuery =
    (searchQuery: string) => (todos: Array<TodoItem>) =>
      _.isEmpty(searchQuery)
        ? todos
        : todos.filter(
            ({ title }) =>
              title.toLowerCase().search(searchQuery.toLowerCase()) >= 0
          );

  useEffect(() => {
    _.flow([
      filterByCategory(category),
      filterBySearchQuery(searchQuery),
      setDisplayTodos,
    ])(todos);
  }, [category, todos.length, doneLength, searchQuery]);

  const hideModal = () => {
    setNewTodoModalShown(false);
  };

  const showModal = () => {
    setNewTodoModalShown(true);
  };

  const addNewTodo = (newTodoItem: TodoItem | null) => {
    if (_.isNil(newTodoItem)) return;
    Alert.success(`${cutStringIfNeeded(newTodoItem.title)} successfully added`);
    setTodos([...todos, newTodoItem]);
  };

  const toggleDone = (id: string) => {
    setTodos(
      todos.map((todo) => {
        const isToBeToggled = todo.id === id;

        if (!isToBeToggled) return todo;

        const newStatus = !todo.isDone;

        Alert.success(
          `${cutStringIfNeeded(todo.title)} moved to ${
            newStatus ? "done" : "active"
          }`
        );

        return { ...todo, isDone: newStatus, completedDate: new Date() };
      })
    );
  };

  const handleDelete = (id: string) => {
    setTodos(
      todos.filter(({ id: _id, title }) => {
        const toDelete = id === _id;

        if (toDelete) {
          Alert.success(`${cutStringIfNeeded(title)} successfully deleted`);
        }
        return !toDelete;
      })
    );
  };

  const handleSetCategory = (cat: Categories) => {
    setCategory(cat);
  };

  const handleSearch = (searchQuery: string) => {
    setSearchQuery(searchQuery);
  };

  return (
    <div
      style={{
        minHeight: "500px",
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
        flexDirection: "column",
        width: "40vw",
      }}
    >
      <ControlPanel
        showModal={showModal}
        handleSearch={handleSearch}
        handleSetCategory={handleSetCategory}
        currentCategory={category}
        showAddTodoModal={newTodoModalShown}
        hideAddTodoModal={hideModal}
        addNewTodo={addNewTodo}
      />
      <TodoList
        todos={displayTodos}
        toggleDone={toggleDone}
        handleDelete={handleDelete}
      />
    </div>
  );
};
