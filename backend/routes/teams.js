const express = require('express');
const router = express.Router();
const Team = require('../models/Team');

router.post('/add', async (req, res) => {
  const { name } = req.body;
  try {
    const newTeam = new Team({ name });
    await newTeam.save();
    res.status(201).json(newTeam);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;