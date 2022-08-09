const express = require('express');
const server = express();
const client = require('./db/client');
const port = 3000;

//MIDDLEWARES
server.use(express.json());

//ROUTES
server.get('/', (req, res) => {
  res.send({
    page: 'home',
    test: 'server working',
  });
});

//SERVER
client.connect();
server.listen(port, () => {
  console.log(`Running on server: ${port}`);
});
