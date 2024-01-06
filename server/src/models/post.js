const mongoose = require("mongoose");

const postModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  text: {
    type: String,
    required: true,
  },
  autorID: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    require: true,
  },
  dateUpdate: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("posts", postModel);
