import React, { useEffect, useState } from "react";
import _ from "lodash";
import { Alert, List } from "rsuite";

import { TodoItem, Categories } from "types";
import { AddTodoModal } from "components/add-todo-modal";
import { TodoItemComponent } from "components/todo-item-component";
import { CategorySelector } from "components/category-selector";

export const Todo: React.FC = () => {
  const [todos, setTodos] = useState<Array<TodoItem>>([]);
  const [category, setCategory] = useState<Categories>(Categories.ALL);
  const [displayTodos, setDisplayTodos] = useState<Array<TodoItem>>(todos);
  const [newTodoModalShown, setNewTodoModalShown] = useState<boolean>(false);

  const doneLength = todos.reduce(
    (count, { done }) => (done ? count + 1 : count),
    0
  );

  useEffect(() => {
    setDisplayTodos(
      {
        [Categories.ALL]: () => todos,
        [Categories.ACTIVE]: () => todos.filter(({ done }) => !done),
        [Categories.DONE]: () => todos.filter(({ done }) => done),
      }[category]()
    );
  }, [category, todos.length, doneLength]);

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
