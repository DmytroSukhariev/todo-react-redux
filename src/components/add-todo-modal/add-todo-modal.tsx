import React, { useState } from "react";
import _ from "lodash";
import { Modal, Button, Input, Alert } from "rsuite";
import { v4 as uuid } from "uuid";

import { TodoItem } from "types";

export type Props = {
  showTodoModal: boolean;
  hideTodoModal: () => void;
  setData: (todoData: TodoItem) => void;
};

export const AddTodoModal: React.FC<Props> = ({
  showTodoModal,
  hideTodoModal,
  setData,
}) => {
  const [title, setTitle] = useState<string | null>(null);

  const handleSubmit = () => {
    if (_.isNil(title) || _.isEmpty(title)) {
      return Alert.error("Title is required");
    }

    setData({
      title,
      createdDate: new Date(),
      isDone: false,
      id: uuid(),
    });

    hideTodoModal();
  };

  return (
    <Modal show={showTodoModal} onHide={hideTodoModal}>
      <Modal.Header>
        <Modal.Title>Add new ToDo item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Input placeholder="Title" onChange={setTitle} required />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={hideTodoModal}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </Modal.Footer>
    </Modal>
  );
};
