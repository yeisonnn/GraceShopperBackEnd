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

server.use(cors());
server.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
  next();
});
server.use(
  cors({
      origin: "http://localhost:3000", 
      credentials: true,
  })
);

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


