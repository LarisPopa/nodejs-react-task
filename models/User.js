const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { type: String },
  password: { type: String },
  createDate: { type: Date, default: Date.now() },
  refreshToken: { type: String },
});

module.exports = User = mongoose.model("User", UserSchema);
