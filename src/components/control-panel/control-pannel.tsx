import React from "react";

import { Search, Props as SearchProps } from "components/search";
import {
  CategorySelector,
  Props as CategorySelectorProps,
} from "components/category-selector";
import {
  AddTodoModal,
  Props as AddTodoModalProps,
} from "components/add-todo-modal";

import type { Categories } from "types";

export type Props = {
  showModal: () => void;
  handleSearch: SearchProps["handleSearch"];
  handleSetCategory: CategorySelectorProps["handleSelectCategory"];
  currentCategory: Categories;
  showAddTodoModal: boolean;
  hideAddTodoModal: () => void;
  addNewTodo: AddTodoModalProps["setData"];
};

export const ControlPanel: React.FC<Props> = ({
  showModal,
  handleSearch,
  handleSetCategory,
  currentCategory,
  showAddTodoModal,
  hideAddTodoModal,
  addNewTodo,
}) => (
  <div
    className={"control-panel"}
    style={{
      margin: "10px",
      display: "flex",
      justifyContent: "space-between",
    }}
  >
    <button onClick={showModal}>Add new</button>
    <Search handleSearch={handleSearch} />
    <CategorySelector
      handleSelectCategory={handleSetCategory}
      activeCategory={currentCategory}
    />
    <AddTodoModal
      showTodoModal={showAddTodoModal}
      hideTodoModal={hideAddTodoModal}
      setData={addNewTodo}
    />
  </div>
);
