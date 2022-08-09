const client = require('./client');

const createCartData = async ({ user_id, is_purchased }) => {
  try {
    const { rows } = await client.query(
      `INSERT INTO cart(user_id, is_purchased)
    VALUES ($1, $2)
    RETURNING *`,
      [user_id, is_purchased]
    );
    return rows;
  } catch (error) {
    throw error;
  }
};

const createDataCartProducts = async ({ product_id, cart_id, quantity }) => {
  try {
    const { rows } = await client.query(
      `INSERT INTO cart_products(product_id, cart_id, quantity)
    VALUES ($1, $2, $3)
    RETURNING *`,
      [product_id, cart_id, quantity]
    );
    return rows;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createCartData,
  createDataCartProducts,
};
