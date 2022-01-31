const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();

//cors
app.use(cors());
const userRoute = require("./routes/user");
const taskRoute = require("./routes/task");

//BodyParser Middleware
app.use(express.json());

//middleware route
app.use("/user", userRoute);
app.use("/task", taskRoute);

dotenv.config();

//Database connection
mongoose
  .connect(process.env.MONGO_DB_CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected!");
  })
  .catch((err) => console.log(err));

app.listen(4000, () => {
  console.log("Server run on port 4000");
});

module.exports = app;
