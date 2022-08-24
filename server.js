require('dotenv').config();
const express = require('express');
const server = express();
const client = require('./db/client');
const stripe = require('stripe')(process.env.SECRET_KEY);
const { PORT = 3000 } = process.env;
const morgan = require('morgan');
const apiRouter = require('./api/index');
const cors = require('cors');

//MIDDLEWARES
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
server.use(cors({ origin: '*' }));
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


