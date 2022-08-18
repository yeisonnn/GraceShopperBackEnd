require('dotenv').config();
const express = require("express");
const router = express.Router();
const cors = require("cors");

const stripe = require("stripe")(
    process.env.SECRET_KEY
  );


  
  server.post("/payment", async (req, res) => {
    console.log('getting here 1')
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "T-shirt",
            },
            unit_amount: 2000,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "https://graceshopperbackend.herokuapp.com/api/success.html",
      cancel_url: "https://graceshopperbackend.herokuapp.com/api/cancel.html",
    });
})

















  // //payment

// server.post("/payment", async (req, res)=>{
//     const {products, token} = req.body
  
//     return stripe.customers.create({
//       email: token.email,
//       source: token.id
//     }).then(customer => {
//       stripe.charges.create({
//         amount: products.price * 100,
//         currency: 'usd',
//         customer: customer.id,
//         receipt_email: token.email,
//         description: products.description,
//         shipping: {
//           name: token.card.name,
//           address: {
//             street:token.card.street
//           }
//         }
//       },)
//     }).then(result => res.status(200).json(result))
//     .catch(error => console.log(error))
  
//   })

  module.exports = router;