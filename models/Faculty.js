const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FacultySchema = new Schema({
  date: {
    type: String,
  },
  fname: {
    type: String,
  },
  desg: {
    type: String,
  },
  dep: {
    type: String,
  },
  doj: {
    type: String,
  },
  mail: {
    type: String,
  },
  code: {
    type: String,
  },
  contact: {
    type: String,
  },
});

module.exports = Faculty = mongoose.model("faculty", FacultySchema);
