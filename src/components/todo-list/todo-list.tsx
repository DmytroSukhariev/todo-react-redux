import React from "react";
import { List } from "rsuite";

import {
  TodoItemComponent,
  Props as TodoItemProps,
} from "components/todo-item";

import { TodoItem } from "types";

type Props = {
  todos: Array<TodoItem>;
  toggleDone: TodoItemProps["toggleDone"];
  handleDelete: TodoItemProps["handleDelete"];
};

export const TodoList: React.FC<Props> = ({
  todos,
  toggleDone,
  handleDelete,
}) => (
  <div
    className={"todo-list"}
    style={{
      display: "flex",
      flexDirection: "column",
      margin: "10px",
      minHeight: "300px",
    }}
  >
    <List>
      {todos.map((todo) => (
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
);
