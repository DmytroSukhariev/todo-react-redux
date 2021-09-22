import React, { useEffect, useState } from "react";
import _ from "lodash/fp";
import { Alert, List } from "rsuite";

import { Categories, TodoItem } from "types";
import { AddTodoModal } from "components/add-todo-modal";
import { TodoItemComponent } from "components/todo-item-component";
import { CategorySelector } from "components/category-selector";
import { Search } from "components/search";

export const Todo: React.FC = () => {
  const [todos, setTodos] = useState<Array<TodoItem>>([]);
  const [category, setCategory] = useState<Categories>(Categories.ALL);
  const [displayTodos, setDisplayTodos] = useState<Array<TodoItem>>(todos);
  const [newTodoModalShown, setNewTodoModalShown] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const doneLength = todos.reduce(
    (count, { done }) => (done ? count + 1 : count),
    0
  );

  const filterByCategory =
    (category: Categories) => (todos: Array<TodoItem>) => {
      switch (category) {
        case Categories.ALL:
          return todos;
        case Categories.ACTIVE:
          return todos.filter(({ done }) => !done);
        case Categories.DONE:
          return todos.filter(({ done }) => done);
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
    if (_.isNil(newTodoItem)) return Alert.warning("Nothing to add");
    setTodos([...todos, newTodoItem]);
    Alert.success("Todo added");
  };

  const toggleDone = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, done: !todo.done, completionDate: new Date() }
          : todo
      )
    );
  };

  const handleDelete = (id: string) => {
    setTodos(todos.filter(({ id: _id }) => id !== _id));
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
      <div
        className={"controll-pannel"}
        style={{
          margin: "10px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <button onClick={showModal}>Add new</button>
        <Search handleSearch={handleSearch} />
        <CategorySelector
          handleSelectCategory={handleSetCategory}
          activeCategory={category}
        />
        <AddTodoModal
          showTodoModal={newTodoModalShown}
          hideTodoModal={hideModal}
          setData={addNewTodo}
        />
      </div>
      <div
        className={"todo-list"}
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "10px",
        }}
      >
        <List>
          {displayTodos.map((todo) => (
            <List.Item key={todo.id}>
              <TodoItemComponent
                {...todo}
                toggleDone={toggleDone}
                handleDelete={handleDelete}
              />
            </List.Item>
          ))}
        </List>
      </div>
    </div>
  );
};
