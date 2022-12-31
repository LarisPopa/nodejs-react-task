import React, { useState, useEffect } from "react";
import { editTaskService, getTasksService } from "../backend/TasksService";
import { Row, Col, Button, Form } from "react-bootstrap";
import { getEmail, removeAccessToken, removeEamil } from "../backend/RESTUtils";
import { useHistory } from "react-router-dom";
import ModalComponent from "./basic/ModalComponent";
import Task from "./Task";
import DropDownComponent from "./basic/DropDownComponent";

const Dashboard = () => {
  const history = useHistory();

  const [tasks, setTasks] = useState([]);
  const [taskModal, setTaskModal] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [sortBy, setSortBy] = useState("dueDate");
  const [sortOrder, setSortOrder] = useState("DESC");
  const [pageNr, setPageNr] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchText, setSearchtext] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const statuses = [
    { name: "All", value: "ALL" },
    { name: "ToDo", value: "ToDo" },
    { name: "InProgress", value: "InProgress" },
    { name: "Done", value: "Done" },
    { name: "Failed", value: "Failed" },
  ];

  const getTasks = async () => {
    try {
      const result = await getTasksService(
        pageNr,
        pageSize,
        sortOrder,
        sortBy,
        searchText,
        selectedStatus
      );
      if (result) setTasks(result);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getTasks();
  }, [
    sortBy,
    sortOrder,
    pageNr,
    pageSize,
    refresh,
    searchText,
    selectedStatus,
  ]);

  const handleLogout = () => {
    removeAccessToken();
    removeEamil();
    history.push("/");
  };

  const refreshTasks = () => {
    setRefresh(!refresh);
  };

  const handleStatusUpdate = async (value, id) => {
    try {
      await editTaskService({ id: id, status: value });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Row>
        <Col className="text-right p-3">
          {getEmail()}
          <Button variant="danger" className="ml-2" onClick={handleLogout}>
            LogOut
          </Button>
        </Col>
      </Row>
      <Row>
        <Col xs={2}>
          <Button
            variant="primary"
            className="mb-2"
            onClick={() => setTaskModal(true)}
          >
            Add New Task
          </Button>
          <ModalComponent
            show={taskModal}
            size="xl"
            close={() => setTaskModal(false)}
            headingText="Add Task"
            body={
              <Task
                closeModal={() => setTaskModal(false)}
                refreshTasks={refreshTasks}
              />
            }
          />
        </Col>
        <Col xs={7}>
          <Form.Control
            placeholder={"Search by name or description"}
            value={searchText}
            onChange={(e) => setSearchtext(e.target.value)}
          />
        </Col>
        <Col xs={3}>
          <DropDownComponent
            dropdownDefaulText="Status"
            data={statuses}
            onChange={(value) => setSelectedStatus(value)}
          />
        </Col>
      </Row>
      <Row>
        <Col className="text-center">
          <Row>
            <Col xs={2}>
              <strong>Name</strong>
              <i
                className="fa fa-arrow-up ml-2 mr-1"
                onClick={() => {
                  setSortBy("name");
                  setSortOrder("ASC");
                }}
                style={{
                  color:
                    sortOrder === "ASC" && sortBy === "name" ? "red" : "black",
                }}
              />
              <i
                className="fa fa-arrow-down"
                onClick={() => {
                  setSortBy("name");
                  setSortOrder("DESC");
                }}
                style={{
                  color:
                    sortOrder === "DESC" && sortBy === "name" ? "red" : "black",
                }}
              />
            </Col>
            <Col xs={2}>
              <strong>Description</strong>
              <i
                className="fa fa-arrow-up ml-2 mr-1"
                onClick={() => {
                  setSortBy("description");
                  setSortOrder("ASC");
                }}
                style={{
                  color:
                    sortOrder === "ASC" && sortBy === "description"
                      ? "red"
                      : "black",
                }}
              />
              <i
                className="fa fa-arrow-down"
                onClick={() => {
                  setSortBy("description");
                  setSortOrder("DESC");
                }}
                style={{
                  color:
                    sortOrder === "DESC" && sortBy === "description"
                      ? "red"
                      : "black",
                }}
              />
            </Col>
            <Col xs={2}>
              <strong>Due Date</strong>
              <i
                className="fa fa-arrow-up ml-2 mr-1"
                onClick={() => {
                  setSortBy("dueDate");
                  setSortOrder("ASC");
                }}
                style={{
                  color:
                    sortOrder === "ASC" && sortBy === "dueDate"
                      ? "red"
                      : "black",
                }}
              />
              <i
                className="fa fa-arrow-down"
                onClick={() => {
                  setSortBy("dueDate");
                  setSortOrder("DESC");
                }}
                style={{
                  color:
                    sortOrder === "DESC" && sortBy === "dueDate"
                      ? "red"
                      : "black",
                }}
              />
            </Col>
            <Col xs={2}>
              <strong>Status</strong>
              <i
                className="fa fa-arrow-up ml-2 mr-1"
                onClick={() => {
                  setSortBy("status");
                  setSortOrder("ASC");
                }}
                style={{
                  color:
                    sortOrder === "ASC" && sortBy === "status"
                      ? "red"
                      : "black",
                }}
              />
              <i
                className="fa fa-arrow-down"
                onClick={() => {
                  setSortBy("status");
                  setSortOrder("DESC");
                }}
                style={{
                  color:
                    sortOrder === "DESC" && sortBy === "status"
                      ? "red"
                      : "black",
                }}
              />
            </Col>
            <Col xs={3}>
              <strong>Tags</strong>
            </Col>
          </Row>
          {tasks.map((task, index) => {
            return (
              <Row key={index} className="mt-2">
                <Col xs={2}>{task.name}</Col>
                <Col xs={2}>{task.description}</Col>
                <Col xs={2}> {new Date(task.dueDate).toDateString()}</Col>
                <Col xs={2} className="col-status">
                  <div>{task.status}</div>
                  <div>
                    {task.status !== "Done" && task.status !== "Failed" && (
                      <DropDownComponent
                        defaultValue={task.status}
                        dropdownDefaulText="Status"
                        data={statuses.filter(
                          (status) => status.value !== "ALL"
                        )}
                        onChange={(value) => {
                          handleStatusUpdate(value, task._id);
                          refreshTasks();
                        }}
                      />
                    )}
                  </div>
                </Col>
                <Col xs={3}>{task.tags.join(", ")}</Col>
              </Row>
            );
          })}
        </Col>
      </Row>
      <Row className="mt-5">
        <Col xs={6} className="text-left">
          <Button
            variant="primary"
            className="mr-1"
            onClick={() => {
              if (pageNr === 1) return;
              setPageNr(pageNr - 1);
            }}
          >
            Prev
          </Button>
          Current Page: {pageNr}
          <Button
            variant="primary"
            className="ml-1"
            onClick={() => {
              setPageNr(pageNr + 1);
            }}
          >
            Next
          </Button>
        </Col>
        <Col xs={6} className="text-right">
          <Button
            variant="primary"
            className="mr-1"
            onClick={() => {
              if (pageSize === 5) return;
              setPageSize(pageSize - 5);
            }}
          >
            -5
          </Button>
          Items/Page: {pageSize}
          <Button
            variant="primary"
            className="ml-1"
            onClick={() => setPageSize(pageSize + 5)}
          >
            +5
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
