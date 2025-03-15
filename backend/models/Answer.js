const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
    password: {
        type: String,
        required: true,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Answer", answerSchema);