const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
    teamName: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Team", teamSchema);
