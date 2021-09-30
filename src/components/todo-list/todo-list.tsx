import React from "react";
import { List } from "rsuite";
import { useSelector } from "react-redux";

import { TodoItemComponent } from "components/todo-item";
import { selectTodos } from "state";

export const TodoList: React.FC = () => {
  const todos = useSelector(selectTodos);

  return (
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
            <TodoItemComponent todoItem={todo} />
          </List.Item>
        ))}
      </List>
    </div>
  );
};
