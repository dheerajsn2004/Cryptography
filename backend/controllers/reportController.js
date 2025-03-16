const Team = require("../models/teamModel");
const Report = require("../models/reportModel");

exports.validateReport = async (req, res) => {
    try {
        const { username, questionNumber, answer } = req.body;

        let team = await Team.findOne({ username });
        if (!team){ 
             res.status(404).json({ error: "Team not found" });
             return;
        }
        let report = await Report.findOne({ questionNumber });
        if (!report){
            res.status(400).json({ message: "Invalid report question number!" });
            return;
        }

        let existingAttempt = team.reportValidated.find(q => q.questionNumber === questionNumber);

        if (existingAttempt && existingAttempt.validated) {
            res.status(400).json({ message: "Already validated this report question!" });
            return;
        }

        if (answer !== report.correctAnswer) {
             res.status(400).json({ message: "Incorrect answer!" });
             return;
        }

        if (!existingAttempt) {
            team.reportValidated.push({ questionNumber, validated: true });
            team.points += 5; // ✅ Adjust points based on scoring
        } else {
            existingAttempt.validated = true;
        }

        team.lastSubmissionTime = new Date();
        await team.save();

        res.status(200).json({ message: "Report question validated!", points: team.points });
        return ;

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
