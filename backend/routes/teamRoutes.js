const express = require("express");
const router = express.Router();
const Team = require("../models/Team");
const Answer = require("../models/Answer");

// Login route
router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await Team.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        // Check password (ideally, use bcrypt for hashing)
        if (user.password !== password) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        // Check if the user has already submitted the password
        if (user.hasSubmittedPassword) {
            return res.status(200).json({ message: "Login successful", redirectToEmail: true, user });
        }

        res.status(200).json({ message: "Login successful", redirectToEmail: false, user });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});


// Update email route
router.post("/update-email", async (req, res) => {
    const { username, email } = req.body;

    try {
        const user = await Team.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.email = email;
        await user.save();

        res.status(200).json({ message: "Email updated successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Verify password from answers collection and update team points
router.post("/verify-password", async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the team
        const team = await Team.findOne({ username });

        if (!team) {
            return res.status(404).json({ message: "Team not found" });
        }

        // Check if the team has already submitted the password
        if (team.hasSubmittedPassword) {
            return res.status(400).json({ message: "Password already submitted" });
        }

        // Verify the password in the answers collection
        const answer = await Answer.findOne({ password });

        if (!answer) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        // Update points, last submission time, and mark as submitted
        team.points += 5; // Add 5 points
        team.lastSubmissionTime = new Date(); // Set the current timestamp
        team.hasSubmittedPassword = true; // Mark as submitted
        await team.save();

        res.status(200).json({ message: "Password verified and points updated", team });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});
router.get("/team-status", async (req, res) => {
    const { username } = req.query;

    try {
        const team = await Team.findOne({ username });

        if (!team) {
            return res.status(404).json({ message: "Team not found" });
        }

        res.status(200).json({ hasSubmittedPassword: team.hasSubmittedPassword });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;