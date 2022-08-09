const client = require('./client');

const createUser = async ({
  username,
  password,
  first_name,
  last_name,
  mobile,
  email,
}) => {
  try {
    const { rows } = await client.query(
      `INSERT INTO users(username, password, first_name, last_name, mobile, email) 
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (username) DO NOTHING
      RETURNING *`,
      [username, password, first_name, last_name, mobile, email]
    );
    return rows;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createUser,
};
