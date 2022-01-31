import { doGet, doPost, doPut } from "./RESTUtils";

export const getTasksService = async (
  pageNr,
  pageSize,
  sortOrder,
  sortBy,
  searchText,
  selectedStatus
) => {
  return await doGet(
    `/task/tasks?pageNr=${pageNr}&pageSize=${pageSize}&sortOrder=${sortOrder}&sortBy=${sortBy}&searchText=${searchText}&selectedStatus=${selectedStatus}`
  );
};

export const addTaskService = async (task) => {
  return await doPost(`/task/tasks`, task);
};

export const editTaskService = async (task) => {
  return await doPut(`/task/tasks`, task);
};
