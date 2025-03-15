const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        default: "",
    },
    points: {
        type: Number,
        default: 0, // Initialize points to 0
    },
    lastSubmissionTime: {
        type: Date,
        default: null, // Initialize to null
    },
    hasSubmittedPassword: {
        type: Boolean,
        default: false, // Initialize to false
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Team", teamSchema);