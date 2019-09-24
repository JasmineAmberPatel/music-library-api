const Album = require('../models/album');
const Artist = require('./artist');

exports.createAlbum = (req, res) => {
  const album = new Album({
    name: req.body.name,
    year: req.body.year,
    artist: req.params.artistId,
  });
  if (!album.artist) {
    res.status(404).json({ error: 'The artist could not be found.' });
  } else {
    album.save().then(() => {
      res.status(201).json(album);
    });
  };
};

exports.find = (req, res) => {
  Album.findById((req.params.albumId), (err, album) => {
    if (!album) {
      res.status(404).json({ error: 'The album could not be found.' });
    } else {
      res.status(200).json(album);
    }
  });
};
