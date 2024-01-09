var mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    email: String,
    password: String,
    name: String,
    dateOfBirth: String,
    gender: String,
    height: String,
    weight: String,
    games: String,
    place: String,
    dateTime: String, 
  });

module.exports = mongoose.model('Player', playerSchema); 
