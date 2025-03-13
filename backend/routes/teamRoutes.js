const express = require("express");
const router = express.Router();
const Team = require("../models/Team");

// POST route to store team names
router.post("/add-team", async (req, res) => {
    try {
        const { teamName } = req.body;
        if (!teamName) {
            return res.status(400).json({ message: "Team name is required" });
        }

        // Check if team already exists
        const existingTeam = await Team.findOne({ teamName });
        if (existingTeam) {
            return res.status(400).json({ message: "Team name already exists" });
        }

        const newTeam = new Team({ teamName });
        await newTeam.save();

        res.status(201).json({ message: "Team added successfully!", team: newTeam });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

module.exports = router;
