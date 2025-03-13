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
    secretCode: {
        type: String,
        default: "", // Optional: Set a default value if needed
    },
    email: {
        type: String,
        trim: true,
        default: "",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Team", teamSchema);