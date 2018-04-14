require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');

const mongoose = require('./db/mongoose');
const hackerNewsWorker = require('./workers/hackerNews');
const listRoute = require('./routes/list');

const app = express();
const server = http.Server(app);

const port = process.env.PORT;

app.use(bodyParser.json());

app.use('/api/list', listRoute);

mongoose.connect().then(() => {
  hackerNewsWorker.connect().then(() => {
    console.log('First update of lists and items has been successful.');
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});