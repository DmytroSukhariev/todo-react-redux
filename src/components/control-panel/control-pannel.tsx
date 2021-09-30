import React from "react";
import _ from "lodash/fp";

import { Search } from "components/search";
import { CategorySelector } from "components/category-selector";
import { AddTodoModal } from "components/add-todo-modal";

import { showTodoModal, useDispatch } from "state";

export const ControlPanel: React.FC = () => {
  const dispatch = useDispatch();

  const handleShowModal: () => void = _.flow([
    _.noop,
    showTodoModal,
    dispatch,
    _.noop,
  ]);

  return (
    <div
      className={"control-panel"}
      style={{
        margin: "10px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <button onClick={handleShowModal}>Add new</button>
      <Search />
      <CategorySelector />
      <AddTodoModal />
    </div>
  );
};
