import React from "react";
import moment from "moment";
import { Checkbox, IconButton, Icon, Alert } from "rsuite";
import _ from "lodash/fp";

import { useDispatch, removeTodo, toggleDoneTodo } from "state";

import { cutStringIfNeeded } from "utils";

import { TodoItem } from "types";

import "./todo-item-component.css";

export const TodoItemComponent: React.FC<{ todoItem: TodoItem }> = ({
  todoItem: { id, title, createdDate, isDone },
}) => {
  const dispatch = useDispatch();

  const handleDelete: () => void = _.flow([
    _.constant(id),
    removeTodo,
    dispatch,
    () => Alert.success(`${cutStringIfNeeded(title)} successfully deleted`),
  ]);

  const toggleDone: () => void = _.flow([
    _.constant(id),
    toggleDoneTodo,
    dispatch,
    () =>
      Alert.success(
        `${cutStringIfNeeded(title)} moved to ${!isDone ? "done" : "active"}`
      ),
  ]);

  return (
    <div className="todo-item">
      <Checkbox
        className="todo-item-is-done-checkbox"
        checked={isDone}
        onChange={toggleDone}
      />
      <span className="todo-item-title">{title}</span>
      <span className="todo-item-created-date-time">
        {moment(createdDate).format("YYYY-MM-DD hh:mm")}
      </span>
      <IconButton
        className="todo-item-delete"
        icon={<Icon icon="trash" />}
        onClick={handleDelete}
      />
    </div>
  );
};
