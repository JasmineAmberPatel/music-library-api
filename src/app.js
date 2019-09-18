const express = require('express');
const app = express();
const artistControllers = require('./controllers/artist');

app.get('*', (req, res) => {
  res.status(200).json({ message: 'Hello World!' });
});

app.post('/artists', artistControllers.create);


module.exports = app;
