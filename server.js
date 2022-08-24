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

server.get('/', function(request, response) {
  response.sendFile(__dirname + '/message.json');
});

// CORS header `Access-Control-Allow-Origin` set to accept all
server.get('/allow-cors', function(request, response) {
  response.set('Access-Control-Allow-Origin', '*');
  response.sendFile(__dirname + '/message.json');
});

// listen for requests :)
const listener = server.listen(process.env.PORT, function() {
  console.log('Your server is listening on port ' + listener.address().port);
});
