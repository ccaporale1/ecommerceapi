import createServer from './app.js';
const express = require('express');
const app = express();


const server = createServer();
const port = 3000;

server.listen(port, () => {
  console.log(`server listening on ${port}`);
});