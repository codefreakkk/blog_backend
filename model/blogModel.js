const mongoose = require("mongoose");

const blog = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categoryModel",
  },
  title: {
    type: String,
    default: "Your title",
  },
  images: {
    type: [],
  },
  content: {
    type: String,
  },
  userName: {
    type: String,
    default: "",
  },
  previewImage: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    default: "false",
  },
  appearStatus: {
    type: String,
    default: "false",
  },
});

module.exports = new mongoose.model("blog", blog);
