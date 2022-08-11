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
      [name, description, price, category_id, inventory_id]
    );
    return rows;
  } catch (error) {
    throw error;
  }
};

const getProductById = async (id) => {
  try {
    const { rows } = await client.query(
      `
    SELECT * FROM product
    WHERE id = $1;

    `,
      [id]
    );
    return rows;
  } catch (error) {
    throw error;
  }
};

const getProductByName = async ({ name }) => {
  try {
    const { rows } = await client.query(
      `SELECT * FROM product
      WHERE product.name=($1)
    RETURNING *`,
      [name]
    );
    return rows;
  } catch (error) {
    throw error;
  }
};

const updateProductInventory = async ({ quantity, productId }) => {
  try {
    const { rows } = await client.query(
      `UPDATE product_inventory
      SET quantity=($1)
      WHERE product_inventory.id=($2)
    RETURNING *`,
      [quantity, productId]
    );
    return rows;
  } catch (error) {
    throw error;
  }
};

const getProductsByCategory = async (category_id) => {
  try {
    const { rows } = await client.query(
      `SELECT * FROM product
      WHERE product.category_id=($1)
    RETURNING *`,
      [category_id]
    );
    return rows;
  } catch (error) {
    throw error;
  }
};

const getProductCategoryById = async (id) => {
  try {
    const { rows } = await client.query(
      `
      SELECT * FROM product_category
      WHERE id = $1;
    `,
      [id]
    );
    return rows;
  } catch (error) {
    throw error;
  }
};

const updateProduct = async ({ name, description, price, productId }) => {
  try {
    const { rows } = await client.query(
      `UPDATE product
      SET name=$1, description=$2, price=$3
      WHERE product.id=$4
    RETURNING *`,
      [name, description, price, productId]
    );
    return rows;
  } catch (error) {
    throw error;
  }
};

const getAllProducts = async () => {
  try {
    const { rows } = await client.query(`
    SELECT * FROM product;
    `);

    return rows;
  } catch (error) {
    throw error;
  }
};

const getAllProductCategory = async () => {
  try {
    const { rows } = await client.query(`SELECT * FROM product_category;
    `);
    return rows;
  } catch (error) {
    throw error;
  }
};

const deleteProduct = async (productId) => {
  try {
    const { rows } = await client.query(
      `DELETE FROM product WHERE product.id=$1`, [productId]
    )
    return rows
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createProductsCategory,
  createProductsInventory,
  createProduct,
  getProductById,
  getProductByName,
  updateProductInventory,
  getProductsByCategory,
  getProductCategoryById,
  updateProduct,
  getAllProducts,
  getAllProductCategory,
  deleteProduct
};
