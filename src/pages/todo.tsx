import React, { useState } from "react";
import _ from "lodash";
import { Alert } from "rsuite";

import { TodoItem } from "types";
import { AddTodoModal } from "components/add-todo-modal";
import { TodoItemComponent } from "components/todo-item-component";

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

  const toggleDone = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, done: !todo.done, completionDate: new Date() }
          : todo
      )
    );
  };

  return (
    <div>
      <button onClick={showModal}>Add new</button>
      <AddTodoModal
        showTodoModal={newTodoModalShown}
        hideTodoModal={hideModal}
        setData={addNewTodo}
      />
      {todos.map((todo) => (
        <TodoItemComponent {...todo} key={todo.id} toggleDone={toggleDone} />
      ))}
    </div>
  );
};
