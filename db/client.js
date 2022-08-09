const { Client } = require('pg');

const client = new Client('postgres://localhost:5432/restaurant_data');

// const connectDB = async () => {
//   const client = new Client('postgres://localhost:5432/restaurant_data');
//   await client.connect();

//   const res = await client.query('SELECT * FROM users');

//   const result = res.rows;

//   await client.end();

//   return result;
// };

// connectDB().then((res) => console.log(res));
module.exports = client;
