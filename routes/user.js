const express = require('express');
const router = express.Router();
const dotenv = require('dotenv')
const Match = require('../models/Match')
dotenv.config();


router.get('/matches', async (req, res) => {
  try {
    const matches = await Match.find();
    res.status(200).json(matches);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch matches' });
  }
});

router.get('/match/:id/link', async (req, res) => {
    const matchId = req.params.id;
    try {
      // Check if the match with the given ID exists in the database
      let match = await Match.findOne({ id: matchId });
  
      if (!match) {
        return res.status(404).json({ message: 'Match not found' });
      }
        const url = `${process.env.link2}${matchId}`;
        const keyval = `${process.env.keyval}`;
        const hostval = `${process.env.hostval}`;
        const options = {
            method: 'GET',
            headers: {
            'x-rapidapi-key': keyval,
            'x-rapidapi-host': hostval 
            }
        };
      const response = await fetch(url, options);
      const result = await response.json();
  
      if (result.url) {
        return res.json({ url: result.url });
      } else {
        return res.status(404).json({ message: 'No URL found for this match' });
      }
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while fetching the match URL' });
    }
  });
  

module.exports = router;
