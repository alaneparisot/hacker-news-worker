require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');

const hackerNewsWorker = require('./workers/hackerNews/hackerNews');

const app = express();
const server = http.Server(app);

const port = process.env.PORT;

app.use(bodyParser.json());

server.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});

if (process.env.NODE_ENV !== 'test') {
  hackerNewsWorker.connect().then(() => {
    console.log('First update of lists and items has been successful.');
  });
}