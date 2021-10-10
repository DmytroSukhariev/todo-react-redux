import React from "react";
import { ControlPanel } from "components/control-panel";
import { TodoList } from "components/todo-list";

import "./todo.css";

export const Todo: React.FC = () => (
  <div className="todo-page">
    <ControlPanel />
    <TodoList />
  </div>
);
