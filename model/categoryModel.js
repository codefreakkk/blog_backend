const mongoose = require("mongoose");

const categoryModel = mongoose.Schema({
    categoryName: {
        type: String,
        require: true,
    }
});

module.exports = new mongoose.model("categoryModel", categoryModel);