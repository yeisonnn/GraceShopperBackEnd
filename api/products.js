const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../db/products');

router.get('/products', async (req, res, next) => {
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

router.get('/products/:productId', async (req, res, next) => {
  try {
    const product = await getProductById(req.params.productId);
    res.send(product);
  } catch ({ name, message }) {
    {
      name, message;
    }
  }
});

router.post('/products', async (req, res, next) => {
  try {
    const product = await createProduct(req.body);
    res.send(product);
  } catch ({ name, message }) {
    {
      name, message;
    }
  }
});

router.patch('/products/:productId', async (req, res, next) => {
  try {
    req.body.productId = req.params.productId;
    console.log(req.body);
    const product = await updateProduct(req.body);
    res.send(product);
  } catch ({ name, message }) {
    {
      name, message;
    }
  }
});

router.delete('/products/:productId', async (req, res, next) => {
  try {
    const product = await deleteProduct(req.params.productId);
    res.send(product);
  } catch ({ name, message }) {
    {
      name, message;
    }
  }
});

module.exports = router;
