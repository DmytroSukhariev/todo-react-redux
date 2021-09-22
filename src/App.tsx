import React from "react";

import { Todo } from "pages/todo";
import "rsuite/dist/styles/rsuite-default.css";

export const App: React.FC = () => (
  <div
    className="App"
    style={{
      display: "flex",
      justifyContent: "center",
      alignContent: "center",
    }}
  >
    <Todo />
  </div>
);
