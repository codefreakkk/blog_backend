const mongoose = require("mongoose");

const userModel = mongoose.Schema({
    userName: {
        type: String,
        require: true,
        required: [true, 'Please add your name'],
    },
    userEmail: {
        type: String,
        required: [true, 'Please add your email'],
        unique: [true, 'User already exists'],
    },
    userPassword: {
        type: String,
        required: [true, 'Please add your password'],
    }
});

module.exports = new mongoose.model("userModel", userModel);