import React, { useState } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addTaskService } from "../backend/TasksService";

const Task = ({ closeModal, refreshTasks }) => {
  const [task, setTask] = useState();

  const addTask = async () => {
    try {
      await addTaskService({ ...task, tags: task?.tags?.split(",") });
      closeModal();
      refreshTasks();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Row className="mb-2">
        <Col>
          <Form.Control
            placeholder={"Name"}
            value={task?.name ?? ""}
            onChange={(e) => setTask({ ...task, name: e.target.value })}
          />
        </Col>
      </Row>
      <Row className="mb-2">
        <Col>
          <Form.Control
            placeholder={"Description"}
            value={task?.description ?? ""}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
          />
        </Col>
      </Row>
      <Row className="mb-2">
        <Col>
          <DatePicker
            placeholderText="Due Date"
            className="w-100"
            dateFormat="dd/MM/yyyy"
            selected={task?.dueDate ?? null}
            value={task?.dueDate ? new Date(task?.dueDate) : null}
            onChange={(date) => {
              setTask({ ...task, dueDate: date });
            }}
          />
        </Col>
      </Row>
      <Row className="mb-2">
        <Col>
          <Form.Control
            placeholder={"Tags (separated by comma)"}
            value={task?.tags ?? ""}
            onChange={(e) => setTask({ ...task, tags: e.target.value })}
          />
        </Col>
      </Row>
      <Row className="mb-2">
        <Col>
          <Button variant="danger" onClick={closeModal}>
            Close
          </Button>
        </Col>
        <Col className="text-right">
          <Button
            variant="primary"
            onClick={addTask}
            disabled={!task?.name || !task?.description || !task?.dueDate}
          >
            Add
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default Task;
