import React from "react";
import moment from "moment";
import { Checkbox, IconButton, Icon } from "rsuite";

import { TodoItem } from "types";

export type Props = {
  toggleDone: (id: string) => void;
  handleDelete: (id: string) => void;
} & TodoItem;

export const TodoItemComponent: React.FC<Props> = ({
  id,
  title,
  createdDate,
  isDone,
  handleDelete,
  toggleDone,
}) => {
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
      <IconButton
        icon={<Icon icon={"trash"} />}
        onClick={() => handleDelete(id)}
      />
    </div>
  );
};
