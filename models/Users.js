const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  date: {
    type: String,
  },
  name: {
    type: String,
  },
  usn: {
    type: String,
  },
  g_year: {
    type: String,
  },
  branch: {
    type: String,
  },
  email: {
    type: String,
  },
  code: {
    type: String,
  },
  contact: {
    type: String,
  },
});

module.exports = User = mongoose.model("users", UserSchema);
