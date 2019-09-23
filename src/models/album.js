const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const { Artist } = require('./artist');

const albumSchema = new Schema({
  name: String,
  year: Number,
  artist: { type: Schema.ObjectId, ref: 'Artist' },
});

const Album = mongoose.model('Album', albumSchema);

module.exports = Album;
