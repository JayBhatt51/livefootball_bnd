const express = require('express');
const router = express.Router();
const Match = require('../models/Match');
const dotenv = require('dotenv');
dotenv.config();

const url = `${process.env.link1}`;
const keyval = `${process.env.keyval}`;
const hostval = `${process.env.hostval}`;
const adminPasscode = process.env.ADMIN_PASSCODE;

const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': keyval,
    'x-rapidapi-host': hostval 
  }
};

router.post('/fetch-and-store', async (req, res) => {
  const { passcode } = req.body; // Assuming the passcode is sent in the request body

  if (passcode !== adminPasscode) {
    return res.status(403).json({ message: 'Unauthorized: Incorrect passcode' });
  }

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (data.result && data.result.length > 0) {
      await Match.deleteMany(); // Clear old data

      const matches = data.result.map(match => ({
        league: match.league,
        home_flag: match.home_flag,
        home_name: match.home_name,
        away_flag: match.away_flag,
        away_name: match.away_name,
        date: match.date,
        time: match.time,
        status: match.status,
        score: match.score,
        id: match.id
      }));

      await Match.insertMany(matches); // Insert new data
      res.status(200).json({ message: 'Data successfully updated in MongoDB' });
    } else {
      res.status(404).json({ message: 'No data available' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch and store data' });
  }
});

module.exports = router;
