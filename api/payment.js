// require('dotenv').config();
const express = require("express");
const router = express.Router();
const cors = require("cors");

router.use(cors({
  origin: "https://graceshopperbackend.herokuapp.com/api/payment"
}))

const stripe = require("stripe")(
    process.env.SECRET_KEY
  );

console.log("hello world")
  
  router.post("/", async (req, res) => {
    console.log('am i in?')
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Oven",
            },
            unit_amount: 5000,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:3000/success.html",
      cancel_url: "http://localhost:3000/cancel.html",
    });
    console.log(session, "session")
    res.status(200).send(session)

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