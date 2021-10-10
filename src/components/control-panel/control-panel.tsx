import React from "react";
import _ from "lodash/fp";

import { Search } from "components/search";
import { CategorySelector } from "components/category-selector";
import { AddTodoModal } from "components/add-todo-modal";

import { showTodoModal, useDispatch } from "state";

import "./control-pannel.css";

export const ControlPanel: React.FC = () => {
  const dispatch = useDispatch();

  const handleShowModal: () => void = _.flow([
    _.noop,
    showTodoModal,
    dispatch,
    _.noop,
  ]);

  return (
    <div className="control-panel">
      <button className="add-new" onClick={handleShowModal}>
        Add new
      </button>
      <Search />
      <CategorySelector />
      <AddTodoModal />
    </div>
  );
};
