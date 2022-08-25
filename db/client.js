const { Client } = require('pg');

const client = new Client({
  connectionString:
    process.env.DATABASE_URL || 'postgres://localhost:5432/restaurant_data',
  ssl:
    process.env.NODE_ENV === 'production'
      ? { rejectUnauthorized: false }
      : undefined,
});
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
