const mongoose = require("mongoose");
const blog = mongoose.Schema({
    userId: {
        type: String,
    },
    title: {
        type: String,
    },
    images: {
        type: []
    },
    content: {
        type: String,
    },
});

module.exports = new mongoose.model("blog", blog);