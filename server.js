require('dotenv').config();
const express = require('express');
const server = express();
const client = require('./db/client');
const { PORT } = process.env;
const morgan = require('morgan');
const apiRouter = require('./api/index');

//MIDDLEWARES
server.use(express.json());
server.use(morgan('dev'));

//SERVER
server.use('/api', apiRouter);
server.use((error, req, res, next) => {
  res.send({
    name: error.name,
    message: error.message,
    error: error.message,
  });
});

client.connect();
server.listen(PORT, () => {
  console.log(`Running on server: ${PORT}`);
});
