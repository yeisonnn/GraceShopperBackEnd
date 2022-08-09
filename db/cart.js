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

// const getAllCartData = async({ id }) {
//   try {
//     const { rows: routines } = await client.query(
//       `SELECT routines.*, users.username AS "creatorName"
//       FROM routines JOIN users ON routines."creatorId" = users.id
//        JOIN routine_activities ON routine_activities."routineId" = routines.id
//       WHERE routine_activities."activityId" = $1 AND routines."isPublic" = true;
//     `,
//       [id]
//     );
//     return attachActivitiesToRoutines(routines);
//   } catch (error) {
//     throw error;
//   }


const updateCartData = async ({product_id, cart_id, quantity }) => {
  try {
    const { rows } = await client.query(
      `INSERT INTO cart_products(product_id, cart_id, quantity)
    VALUES ($1)
    FROM 
    RETURNING *`,
      [product_id, cart_id, quantity]

    );
    return cart;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createCartData,
  createDataCartProducts,
  updateCartData,
};
