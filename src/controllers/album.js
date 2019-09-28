const Album = require('../models/album');

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
  }
};

exports.list = (req, res) => {
  Album.find({}, (err, albums) => {
    res.status(200).json(albums);
  });
};

exports.update = (req, res) => {
  Album.findById(req.params.albumId, (err, album) => {
    if (!album) {
      res.status(404).json({ error: 'The album could not be found.' });
    } else {
      album.set(req.body);
      album.save().then(() => {
        res.status(200).json(album);
      });
    }
  });
};

exports.delete = (req, res) => {
  console.log('delete');
  Album.findByIdAndDelete(req.params.albumId, (err, album) => {
    console.log(album);
    console.log(req.params.albumId);
    if (!album) {
      res.status(404).json({ error: 'The album could not be found.' });
    } else {
      res.status(204).json(album);
    }
  });
};
