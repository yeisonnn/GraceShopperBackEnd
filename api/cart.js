const express = require('express');
const {
  getAllCartData,
  createCartData,
  createDataCartProducts,
  updateCart,
  updateCartProduct,
  deleteCartProduct,
  attachCartProductsToCart,
} = require('../db/cart');
const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const cart = await createCartData(req.body);
    res.send(cart);
  } catch ({ name, message }) {
    {
      name, message;
    }
  }
});

router.post('/cart_products', async (req, res, next) => {
  try {
    const cart_products = await createDataCartProducts(req.body);
    res.send(cart_products);
  } catch ({ name, message }) {
    {
      name, message;
    }
  }
});

router.get('/', async (req, res, next) => {
  try {
    const cart = await getAllCartData();
    if (cart) {
      res.send(cart);
    }
  } catch ({ name, message }) {
    {
      name, message;
    }
  }
});

router.patch('/', async (req, res, next) => {
  try {
    const cart = await updateCart(req.body);
    res.send(cart);
  } catch ({ name, message }) {
    {
      name, message;
    }
  }
});

router.patch('/cart_products', async (req, res, next) => {
  try {
    const cartProduct = await updateCartProduct(req.body);
    res.send(cartProduct);
  } catch ({ name, message }) {
    {
      name, message;
    }
  }
});

router.delete('/', async (req, res, next) => {
  try {
    const cartProduct = await deleteCartProduct(req.params);
    res.send(cartProduct);
  } catch ({ name, message }) {
    {
      name, message;
    }
  }
});

router.post('/cart', async (req, res, next) => {
  try {
    const productsToAdd = await attachCartProductsToCart(req.params);
    res.send(productsToAdd);
  } catch ({ name, message }) {
    name, message;
  }
});

module.exports = router;
