const Album = require('../models/album');
const Artist = require('./artist');

exports.createAlbum = (req, res) => {
  const album = new Album({
    name: req.body.name,
    year: req.body.year,
    artist: req.params.artistId,
  });
  album.save().then(() => {
    res.status(201).json(album);
  });
};
