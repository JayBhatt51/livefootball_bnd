// models/Match.js
const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  league: String,
  home_flag: String,
  home_name: String,
  away_flag: String,
  away_name: String,
  date: String,
  time: String,
  status: String,
  score: String,
  id: { type: String, unique: true },
});

module.exports = mongoose.model('Match', matchSchema);
