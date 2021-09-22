import React, { useState } from "react";
import _ from "lodash";
import { Alert, List } from "rsuite";

import { TodoItem } from "types";
import { AddTodoModal } from "components/add-todo-modal";
import { TodoItemComponent } from "components/todo-item-component";

export const Todo: React.FC = () => {
  const [todos, setTodos] = useState<Array<TodoItem>>([]);
  const [newTodoModalShown, setNewTodoModalShown] = useState<boolean>(false);

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

  return (
    <div
      style={{
        minHeight: "500px",
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <div className={"controll-pannel"} style={{ margin: "10px" }}>
        <button onClick={showModal}>Add new</button>
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
          {todos.map((todo) => (
            <List.Item key={todo.id}>
              <TodoItemComponent {...todo} toggleDone={toggleDone} />
            </List.Item>
          ))}
        </List>
      </div>
    </div>
  );
};
