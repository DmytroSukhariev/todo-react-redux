import React, { useState } from "react";
import _ from "lodash";
import { Alert } from "rsuite";

import { TodoItem } from "types";
import { AddTodoModal } from "components/add-todo-modal";

export const Todo: React.FC = () => {
  const [todos, setTodos] = useState<Array<TodoItem>>([]);
  const [newTodoModalShown, setNewTodoModalShown] = useState<boolean>(false);

  const hideModal = () => {
    setNewTodoModalShown(false);
  };

  const showModal = () => {
    setNewTodoModalShown(true);
  };

  const addNewTodo = (newTodoItem: TodoItem | null) => {
    if (_.isNil(newTodoItem)) return Alert.warning("Nothing to add");
    setTodos([...todos, newTodoItem]);
    Alert.success("Todo added");
  };

  return (
    <div>
      <button onClick={showModal}>Add new</button>
      <AddTodoModal
        showTodoModal={newTodoModalShown}
        hideTodoModal={hideModal}
        setData={addNewTodo}
      />
    </div>
  );
};
