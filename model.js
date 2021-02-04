const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  origin: String,
  destination: String
});

module.exports = mongoose.model('locations', locationSchema);
