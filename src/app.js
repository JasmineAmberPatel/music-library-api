const express = require('express');
const app = express();
const artistControllers = require('./controllers/artist');
app.use(express.json());

app.get('', (req, res) => {
  res.status(200).json({ message: 'Hello Jasmine!' });
});

app.post('/artists', artistControllers.create);

app.get('/artists', artistControllers.list);

app.get('/artists/:artistId', artistControllers.find);

app.patch('/artists/:artistId', artistControllers.update);

app.delete('/artists/:artistId', artistControllers.delete);

module.exports = app;
