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

module.exports = router;
