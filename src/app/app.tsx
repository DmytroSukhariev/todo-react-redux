import React from "react";

import { Todo } from "pages/todo";
import "rsuite/dist/styles/rsuite-default.css";

import "./app.css";

export const App: React.FC = () => (
  <div className="App">
    <Todo />
  </div>
);
