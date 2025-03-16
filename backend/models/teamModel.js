const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    points: { type: Number, default: 0 },
    lastSubmissionTime: { type: Date, default: null },

    // ✅ Store validated questions separately
    cipherValidated: [{ questionId: String, validated: Boolean }],
    emailValidated: [{ questionId: String, validated: Boolean }],
    draftValidated: [{ questionId: String, validated: Boolean }],
    projectValidated: [{ questionId: String, validated: Boolean }],

    // ✅ Store validation for 6 fixed report questions
    reportValidated: [{ questionNumber: Number, validated: Boolean }]
});

module.exports = mongoose.model("Team", teamSchema);
