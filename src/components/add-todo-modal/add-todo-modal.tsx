import React, { useState } from "react";
import _ from "lodash/fp";
import { Modal, Button, Input, Alert } from "rsuite";
import { useSelector } from "react-redux";

import { cutStringIfNeeded } from "utils";

import {
  useDispatch,
  addNewTodo,
  selectIsTodoModalVisible,
  hideTodoModal,
} from "state";

export const AddTodoModal: React.FC = () => {
  const dispatch = useDispatch();
  const isVisible = useSelector(selectIsTodoModalVisible);
  const [title, setTitle] = useState<string | null>(null);

  const handleHideTodoModal: () => void = _.flow([
    _.noop,
    hideTodoModal,
    dispatch,
    _.noop,
  ]);

  const handleSubmit = () => {
    if (_.isNil(title) || _.isEmpty(title)) {
      return Alert.error("Title is required");
    }

    _.flow([
      addNewTodo,
      dispatch,
      () => Alert.success(`${cutStringIfNeeded(title)} successfully added`),
      handleHideTodoModal,
    ])(title);
  };

  return (
    <Modal show={isVisible} onHide={handleHideTodoModal}>
      <Modal.Header>
        <Modal.Title>Add new ToDo item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Input placeholder="Title" onChange={setTitle} required />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleHideTodoModal}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </Modal.Footer>
    </Modal>
  );
};
