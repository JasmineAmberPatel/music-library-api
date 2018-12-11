const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const ArtistController = require('./controllers/Artist');
const AlbumController = require('./controllers/Album');
const SongController = require('./controllers/Song');

require('dotenv').config({
  path: path.join(__dirname, '../', '.env'),
});

const app = express();
mongoose.connect(process.env.DATABASE_CONN, { useNewUrlParser: true });

app.use(bodyParser.json());
app.get('/', (req, res) => res.send('Hello World!'));
app.post('/Artist', ArtistController.post);
app.get('/Artist', ArtistController.list);
app.get('/Artist/:artistId', ArtistController.get);
app.put('/Artist/:artistId', ArtistController.put);
app.delete('/Artist/:artistId', ArtistController.deleteArtist);
app.post('/Artist/:artistId/album', AlbumController.postAlbum);
app.get('/Artist/:artistId/albums', AlbumController.getAlbums);
app.post('/Album/:albumId/song', SongController.postSong);

app.listen(3000);
console.log('Listening on port :3000');

module.exports = app;
