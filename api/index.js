require('dotenv').config();
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const { getUserById, getUserByUsername } = require('../db/users');


router.use(async (req, res, next) => {
  const prefix = 'Bearer ';
  const auth = req.header('Authorization');

  if (!auth) {
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);

    try {
      const { username } = jwt.verify(token, JWT_SECRET);
      const newUser = await getUserByUsername(username);

      if (newUser.user_id) {
        req.user = await getUserById(newUser.user_id);

        next();
      } else if (!newUser.user_id) {
        next({ name: 'JWT issue', message: 'Contact your admin' });
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  } else {
    next({
      name: 'AuthorizationHeaderError',
      message: `Authorization token must start with ${prefix}`,
    });
  }
});

router.use((req, res, next) => {
  if (req.user) {
    console.log('User is set:', req.user);
  }
  next();
});

// USER ROUTER
const usersRouter = require('./users');
router.use('/users', usersRouter);

//PRODUCT ROUTER
const productsRouter = require('./products');
router.use('/catalog', productsRouter);

//PRODUCT CATEGORY ROUTER
const productCategoryRouter = require('./productCategory');
router.use('/catalog', productCategoryRouter);

//CART ROUTER
const cartRouter = require('./cart');
router.use('/cart', cartRouter);

//PAYMENT ROUTER
const paymentRouter = require('./payment');
console.log(paymentRouter, "thispay")
router.use('/payment', paymentRouter);



module.exports = router;
