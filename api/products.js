const express = require('express');
const router = express.Router();
const { getAllProducts, getProductById } = require('../db/products');

router.get('/', async (req, res, next) => {
  try {
    const products = await getAllProducts();
    if (products) {
      res.send(products);
    }
  } catch ({ name, message }) {
    {
      name, message;
    }
  }
});

router.get('/:productId', async (req, res, next) => {
  try {
    const product = await getProductById(req.params.productId);
    res.send(product);
  } catch ({ name, message }) {
    {
      name, message;
    }
  }
});

module.exports = router;
