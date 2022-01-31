const Task = require("../models/Task");

//ADD TASK
const addTask = async (req, res) => {
  const { name, description, dueDate, tags } = req.body;

  try {
    //validate mandatory fields
    if (!name || !description || !dueDate)
      res
        .status(400)
        .send({ err: "Name, description and dueDate are mandatory fields!" });

    //create task
    const task = new Task({
      name,
      description,
      dueDate,
      status: "ToDo",
      tags,
      userId: req.user._id,
    });
    await task.save();

    return res.json({
      msg: "Task created!",
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

const getTasks = async (req, res) => {
  const { sortBy, sortOrder, searchText, selectedStatus } = req.query;

  const page = parseInt(req.query.pageNr);
  const limit = parseInt(req.query.pageSize);
  const startIndex = (page - 1) * limit;

  let findQuery = {
    userId: req.user._id,
  };

  if (selectedStatus && selectedStatus !== "ALL") {
    findQuery = { ...findQuery, status: selectedStatus };
  }

  if (searchText) {
    findQuery = {
      ...findQuery,
      $or: [
        { name: { $regex: searchText, $options: "i" } },
        { description: { $regex: searchText, $options: "i" } },
      ],
    };
  }

  try {
    const tasks = await Task.find(findQuery)
      .limit(limit)
      .skip(startIndex)
      .sort([[sortBy, sortOrder]]);

    return res.send(tasks);
  } catch (err) {
    res.status(500).send(err);
  }
};

//UPDATE TASK
const updateTask = async (req, res) => {
  try {
    await Task.updateOne(
      { _id: req.body.id },
      { $set: { status: req.body.status } }
    );
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  addTask,
  updateTask,
  getTasks,
};
