require('dotenv').config();
const express = require('express');
const server = express();
const client = require('./db/client');
const stripe = require("stripe")(process.env.SECRET_KEY)
const { PORT = 3000 } = process.env
const morgan = require('morgan');
const apiRouter = require('./api/index');
const cors = require('cors')


//MIDDLEWARES
server.use(cors())
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

payment
server.post("/payment", (req, res)=>{
  const {products, token} = req.body

  return stripe.customers.create({
    email: token.email,
    source: token.id
  }).then(customer => {
    stripe.charges.create({
      amount: products.price,
      currency: 'usd',
      customer: customer.id,
      receipt_email: token.email,
      description: products.description,
      shipping: {
        name: token.card.name,
        address: {
          street:token.card.street
        }
      }
    },)
  }).then(result => res.status(200).json(result))
  .catch(error => console.log(error))

})

client.connect();
server.listen(PORT, () => {
  console.log(`Running on server: ${PORT}`);
});
