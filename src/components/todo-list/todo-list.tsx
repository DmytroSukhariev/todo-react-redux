import React from "react";
import { List } from "rsuite";
import { useSelector } from "react-redux";

import { TodoItemComponent } from "components/todo-item";
import { selectTodos } from "state";

import "./todo-list.css";

export const TodoList: React.FC = () => {
  const todos = useSelector(selectTodos);

  return (
    <div className="todo-list">
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
