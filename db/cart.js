const client = require('./client');

const createCartData = async ({ user_id, is_purchased, date }) => {
  try {
    const { rows } = await client.query(
      `INSERT INTO cart(user_id, is_purchased, date)
    VALUES ($1, $2, $3)
    RETURNING *`,
      [user_id, is_purchased, date]
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
const updateCart = async ({ user_id, is_purchased }) => {
  try {
    const { rows } = await client.query(
      `UPDATE cart
      SET is_purchased = true;
      WHERE user_id=$1;
      `,
      [user_id, is_purchased]
    );
  } catch (error) {}
};

const updateCartProduct = async ({ product_id, cart_id, quantity }) => {
  try {
    const { rows } = await client.query(
      `INSERT INTO cart_products(product_id, cart_id, quantity)
    VALUES ($1, $2, $3)
    FROM 
    RETURNING *`,
      [product_id, cart_id, quantity]
    );
    return rows;
  } catch (error) {
    throw error;
  }
};
const getAllCartData = async ({ product_id, id }) => {
  try {
    const { rows } = await client.query(
      `SELECT *
      FROM cart
      WHERE "product_id=$1 
    `,
      [product_id, id]
    );
    return rows;
  } catch (error) {
    throw error;
  }
};

const deleteCartProduct = async ({ product_id, quantity }) => {
  try {
    const {
      rows: { rows },
    } = await client.query(
      `
  DELETE FROM cart
  WHERE "product_id"=$1 "quantity"=$2
  RETURNING *;
  `,
      [product_id, quantity]
    );

    return rows;
  } catch (error) {
    throw error;
  }
};

const attachCartProductsToCart = async ({cart}) => {
try {
  const {rows} = await client.query(
    `
    SELECT * FROM cart
    LEFT JOIN cart_products ON cart_products.cart_id = cart.id
    LEFT JOIN products ON products.id = cart_products.product_id
    WHERE cart.user_id $1 AND is_purchased = false
    ;`,
    [cart]
  );
  return rows
} catch (error) {
 
}

}




module.exports = {
  createCartData,
  createDataCartProducts,
  updateCartProduct,
  getAllCartData,
  deleteCartProduct,
  updateCart,
  attachCartProductsToCart
};
