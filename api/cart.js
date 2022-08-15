const express = require("express");
const {
  getAllCartData,
  createCartData,
  createDataCartProducts,
  updateCart,
  updateCartProduct,
  deleteCartProduct,
} = require("../db/cart");
const router = express.Router();

router.post("/cart", async (req, res, next) => {
  try {
    const cart = await createCartData(req.body);
    res.send(cart);
  } catch ({ name, message }) {
    {
      name, message;
    }
  }
});

router.post("/cart_products", async (req, res, next) => {
  try {
    const cart_products = await createDataCartProducts(req.body);
    res.send(cart_products);
  } catch ({ name, message }) {
    {
      name, message;
    }
  }
});

router.get("/cart", async (req, res, next) => {
  try {
    const cart = await getAllCartData(req.body);
    if (cart) {
      res.send(cart);
    }
  } catch ({ name, message }) {
    {
      name, message;
    }
  }
});

router.patch("/cart", async (req, res, next) => {
  try {
    const cart = await updateCart(req.body);
    res.send(cart);
  } catch ({ name, message }) {
    {
      name, message;
    }
  }
});

router.patch("/cart_products", async (req, res, next) => {
  try {
    const cartProduct = await updateCartProduct(req.body);
    res.send(cartProduct);
  } catch ({ name, message }) {
    {
      name, message;
    }
  }
});

router.delete("/cart", async (req, res, next) => {
  try {
    const cartProduct = await deleteCartProduct(req.params);
    res.send(cartProduct);
  } catch ({ name, message }) {
    {
      name, message;
    }
  }
});

module.exports = router;
