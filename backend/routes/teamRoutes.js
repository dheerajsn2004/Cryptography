const express = require("express");
const router = express.Router();
const Team = require("../models/Team");

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

        res.status(200).json({ message: "Login successful", user });
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



router.post("/verify-secret-code", async (req, res) => {
    const { username, secretCode } = req.body;

    try {
        const user = await Team.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if the secret code matches
        if (user.secretCode === secretCode) {
            res.status(200).json({ message: "Secret code verified", user });
        } else {
            res.status(401).json({ message: "Incorrect secret code" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;