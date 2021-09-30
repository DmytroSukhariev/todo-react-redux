import React from "react";
import moment from "moment";
import { Checkbox, IconButton, Icon, Alert } from "rsuite";
import _ from "lodash/fp";

import { useDispatch, removeTodo, toggleDoneTodo } from "state";

import { cutStringIfNeeded } from "utils";

import { TodoItem } from "types";

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
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Checkbox
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
        }}
        value={id}
        checked={isDone}
        onChange={toggleDone}
      />
      <span
        style={{
          display: "flex",
          alignItems: "center",
          margin: "0 20px",
          width: "20vw",
        }}
      >
        {title}
      </span>
      <span
        style={{
          display: "flex",
          alignItems: "center",
          margin: "0 20px",
        }}
      >
        {moment(createdDate).format("YYYY-MM-DD hh:mm")}
      </span>
      <IconButton icon={<Icon icon={"trash"} />} onClick={handleDelete} />
    </div>
  );
};
