import React from "react";
import { ControlPanel } from "components/control-panel";
import { TodoList } from "components/todo-list";

export const Todo: React.FC = () => {
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
      <ControlPanel />
      <TodoList />
    </div>
  );
};
