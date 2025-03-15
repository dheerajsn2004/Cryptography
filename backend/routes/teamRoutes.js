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
    const { password, emailId } = req.body; // Remove username from the request

    try {
        // Verify the password in the answers collection for the specific email
        const answer = await Answer.findOne({ emailId });

        if (!answer) {
            return res.status(404).json({ message: "Answer not found for this email" });
        }

        // Check if the entered password matches the stored password
        if (answer.password !== password) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        res.status(200).json({ message: "Password verified" });
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