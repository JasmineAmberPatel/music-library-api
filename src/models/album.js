const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const albumSchema = new Schema({
  artist: { type: Schema.ObjectId, ref: 'Artist' },
  name: String,
  year: Number,
});

const Album = mongoose.model('Album', albumSchema);

module.exports = Album;
