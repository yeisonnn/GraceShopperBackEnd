const express = require("express");
const router = express.Router();



//payment
router.post("/payment", (req, res)=>{
    const {products, token} = req.body
  
    return stripe.customers.create({
      email: token.email,
      source: token.id
    }).then(customer => {
      stripe.charges.create({
        amount: products.price * 100,
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

  module.exports = router;