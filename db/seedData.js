const client = require('./client');
const { createUser } = require('./users');
const {
  createProduct,
  createProductsCategory,
  createProductsInventory,
} = require('./products');

const { createCartData, createDataCartProducts } = require('./cart');

const dropTables = async () => {
  try {
    console.log('Dropping all Tables');
    await client.query(`
DROP TABLE IF EXISTS cart CASCADE;
DROP TABLE IF EXISTS cart_products CASCADE;
DROP TABLE IF EXISTS order_details CASCADE;
DROP TABLE IF EXISTS order_history CASCADE;
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS payments_details CASCADE;
DROP TABLE IF EXISTS product CASCADE;
DROP TABLE IF EXISTS product_category CASCADE;
DROP TABLE IF EXISTS product_inventory CASCADE;
DROP TABLE IF EXISTS shopping_session CASCADE;
DROP TABLE IF EXISTS user_address CASCADE;
DROP TABLE IF EXISTS user_payment CASCADE;
DROP TABLE IF EXISTS users CASCADE;
`);
  } catch (error) {
    console.error('Error dropping tables!');
    throw error;
  }
};

const createTables = async () => {
  console.log('Starting to build tables..');
  try {
    await client.query(`CREATE TABLE users(
      user_id SERIAL PRIMARY KEY,
      username VARCHAR(50) UNIQUE NOT NULL,
      password VARCHAR(60) NOT NULL,
      first_name VARCHAR(30) NOT NULL,
      last_name VARCHAR(30) NOT NULL,
      mobile INTEGER,
      email VARCHAR(60) UNIQUE NOT NULL
      );`);

    await client.query(`CREATE TABLE product_category (
        id SERIAL PRIMARY KEY,
        name VARCHAR (30),
        description TEXT
       );`);

    await client.query(`CREATE TABLE product_inventory (
        id SERIAL PRIMARY KEY,
        quantity INTEGER
       );`);

    await client.query(` CREATE TABLE product (
        id SERIAL PRIMARY KEY,
        name VARCHAR (30),
        description TEXT,
        price DECIMAL(8,2),
        category_id INTEGER REFERENCES product_category(id),
        inventory_id INTEGER REFERENCES product_inventory(id)
       );`);

    await client.query(` CREATE TABLE payments_details (
        id SERIAL PRIMARY KEY,
        order_id INTEGER,
        amount INTEGER,
        provider VARCHAR(50),
        created_at DATE
      );`);

    await client.query(` CREATE TABLE order_details (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(user_id),
      total DECIMAL(8,2),
      created_at DATE,
      payment_id INTEGER REFERENCES payments_details(id)
    );`);

    await client.query(` CREATE TABLE order_items (
      id SERIAL PRIMARY KEY,
      order_id INTEGER REFERENCES order_details(id),
      product_id INTEGER REFERENCES product(id),
      quantity INTEGER,
      created_at DATE
    );`);

    // await client.query(`CREATE TABLE shopping_session (
    //   id SERIAL PRIMARY KEY,
    //   user_id INTEGER REFERENCES users(user_id),
    //   total DECIMAL(8,2)
    // );`);

    await client.query(`CREATE TABLE cart (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(user_id),
      is_purchased BOOLEAN
    );`);

    await client.query(`CREATE TABLE cart_products(
  id SERIAL PRIMARY KEY,
  product_id  INTEGER REFERENCES product(id),
  cart_id INTEGER REFERENCES cart(id),
  quantity INTEGER
);`);

    await client.query(`CREATE TABLE user_address(
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(user_id),
      address VARCHAR(100),
      city VARCHAR(50),
      state CHAR(2),
      postal_code VARCHAR(20),
      country VARCHAR(50),
      telefone VARCHAR(20),
      mobile VARCHAR(20) 
    );`);

    await client.query(`CREATE TABLE user_payment(
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(user_id),
      payment_type VARCHAR(50),
      provider VARCHAR(50)
    );`);

    await client.query(`CREATE TABLE order_history(
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(user_id),
      product_id INTEGER REFERENCES product(id),
      order_items_id INTEGER REFERENCES order_items(id)		
    );`);
  } catch (error) {
    console.log('Error creating tables');
    throw error;
  }
};

const createInitialUsers = async () => {
  console.log('Starting to create users...');
  try {
    const usersToCreate = [
      {
        username: 'Eric123',
        password: 'Eric123',
        first_name: 'Eric',
        last_name: 'Eric',
        mobile: 123,
        email: 'eric@mail.com',
      },
      {
        username: 'Ben123',
        password: 'Benc123',
        first_name: 'Ben',
        last_name: 'Ben',
        mobile: 123,
        email: 'Ben@mail.com',
      },
      {
        username: 'Gabriel123',
        password: 'Gabriel123',
        first_name: 'Gabriel',
        last_name: 'Gabriel',
        mobile: 123,
        email: 'gabriel@mail.com',
      },
    ];

    const users = await Promise.all(usersToCreate.map(createUser));
    console.log('Users created:');
    console.log(users);
    console.log('Finished creating users!');
  } catch (error) {
    console.error('Error creating users!');
    throw error;
  }
};

const createInitialProductCategory = async () => {
  try {
    const productCategoriesToCreate = [
      {
        name: 'Glassware',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
      },
      {
        name: 'Dinnerware',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing ea aliqua',
      },
    ];
    const productCategory = await Promise.all(
      productCategoriesToCreate.map(createProductsCategory)
    );
    console.log('Product Category created:');
    console.log(productCategory);
    console.log('Finished creating Product Categories!');
  } catch (error) {
    console.error('Error creating product categories!');
    throw error;
  }
};

const createInitialProductInventory = async () => {
  try {
    const productInventoryToCreate = [
      {
        quantity: 100,
      },
      {
        quantity: 200,
      },
    ];
    const productInventory = await Promise.all(
      productInventoryToCreate.map(createProductsInventory)
    );
    console.log('Product Inventory created:');
    console.log(productInventory);
    console.log('Finished creating Product inventory!');
  } catch (error) {}
};

const createInitialProducts = async () => {
  try {
    const productsToCreate = [
      {
        name: 'Crytal',
        description: 'consectetur adipiscing ea aliqu',
        price: 2,
        category_id: 1,
        inventory_id: 1,
      },
      {
        name: 'Revol',
        description: 'consectetur adipiscing',
        price: 3,
        category_id: 2,
        inventory_id: 2,
      },
    ];
    const product = await Promise.all(productsToCreate.map(createProduct));
    console.log('Products created:');
    console.log(product);
    console.log('Finished creating Products');
  } catch (error) {
    console.error('Error creating products');
    throw error;
  }
};

const createInitialCartData = async () => {
  try {
    const cartToCreate = [
      { user_id: 1, is_purchased: true },
      { user_id: 2, is_purchased: true },
      { user_id: 3, is_purchased: true },
    ];
    const cart = await Promise.all(cartToCreate.map(createCartData));
    console.log('Cart Data created:');
    console.log(cart);
    console.log('Finished creating Cart Data');
  } catch (error) {
    console.error('Error creating products');
    throw error;
  }
};

const createInitialCartProducts = async () => {
  try {
    const cartProductsToCreate = [
      { product_id: 1, cart_id: 1, quantity: 200 },
      { product_id: 2, cart_id: 2, quantity: 300 },
      { product_id: 2, cart_id: 1, quantity: 400 },
    ];
    const cartProducts = await Promise.all(
      cartProductsToCreate.map(createDataCartProducts)
    );
    console.log('Cart products Data created:');
    console.log(cartProducts);
    console.log('Finished creating Cart Products Data');
  } catch (error) {
    console.error('Error creating products');
    throw error;
  }
};

const rebuildDB = async () => {
  try {
    client.connect();
    await dropTables();
    await createTables();
    await createInitialUsers();
    await createInitialProductInventory();
    await createInitialProductCategory();
    await createInitialProducts();
    await createInitialCartData();
    await createInitialCartProducts();
  } catch (error) {
    console.log('Error during rebuildDB');
    throw error;
  }
};

module.exports = {
  rebuildDB,
  dropTables,
  createTables,
};
