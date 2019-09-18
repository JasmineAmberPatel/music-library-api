
const mongoose = require('mongoose');
const Schema = mongoose.schema;

const artistSchema = new mongoose.Schema({
  name: String,
  genre: String,
});

const Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;
