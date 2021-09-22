import React from "react";
import moment from "moment";
import { Checkbox } from "rsuite";

import { TodoItem } from "types";

type Props = {
  toggleDone: (id: string) => void;
} & TodoItem;

export const TodoItemComponent: React.FC<Props> = ({
  id,
  title,
  createdDate,
  done,
  toggleDone,
}) => {
  return (
    <div>
      <Checkbox value={id} checked={done} onChange={toggleDone} />
      <span>{title}</span>
      <span>{moment(createdDate).format("YYYY-MM-DD hh:mm")}</span>
    </div>
  );
};
