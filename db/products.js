const client = require('./client');

const createProductsCategory = async ({ name, description }) => {
  try {
    const { rows } = await client.query(
      `INSERT INTO product_category(name, description)
    VALUES ($1, $2)
    RETURNING *`,
      [name, description]
    );
    return rows;
  } catch (error) {
    throw error;
  }
};

const createProductsInventory = async ({ quantity }) => {
  try {
    const { rows } = await client.query(
      `INSERT INTO product_inventory(quantity)
    VALUES ($1)
    RETURNING *`,
      [quantity]
    );
    return rows;
  } catch (error) {
    throw error;
  }
};

const createProduct = async ({
  name,
  description,
  price,
  category_id,
  inventory_id,
}) => {
  try {
    const { rows } = await client.query(
      `INSERT INTO product(name, description, price, category_id, inventory_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `,
      [name, description, price, category_id, category_id]
    );
    return rows;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createProductsCategory,
  createProductsInventory,
  createProduct,
};
