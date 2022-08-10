const express = require('express');
const router = express.Router();
const {
  getAllProductCategory,
  getProductCategoryById,
} = require('../db/products');

router.get('/', async (req, res, next) => {
  try {
    const productCategory = await getAllProductCategory();
    if (productCategory) {
      res.send(productCategory);
    }
  } catch ({ name, message }) {
    {
      name, message;
    }
  }
});

router.get('/:categoryId', async (req, res, next) => {
  try {
    const productCategory = await getProductCategoryById(req.params.categoryId);
    if (productCategory) {
      res.send(productCategory);
    }
  } catch ({ name, message }) {
    {
      name, message;
    }
  }
});

module.exports = router;
