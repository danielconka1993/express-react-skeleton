const mongoose = require("mongoose");

const commentModel = new mongoose.Schema({
  postID: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  text: {
    type: String,
    require: true,
  },
  autorID: {
    type: String,
    require: true,
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

module.exports = mongoose.model("comments", commentModel);
