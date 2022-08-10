const { lstat } = require("fs");
const client = require("./client");

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

async function getUserById(user_id) {
  try {
    const {
      rows: [users],
    } = await client.query(
      `
  SELECT username, user_id FROM users WHERE user_id=$1;
`,
      [user_id]
    );
    if (!users) return null;

    delete users.password;
    return users;
  } catch (error) {
    throw error;
  }
}

async function getUserByUsername(username) {
  const { rows } = await client.query(
    `
        SELECT *
        FROM users
        WHERE username=$1;
      `,
    [username]
  );
  if (!rows || !rows.length) {
    return null;
  }
  return rows[0];
}

async function getUser({ username, password }) {
  if (!username || !password) {
    return;
  }
  try {
    const user = await getUserByUsername(username);
    if (user && user.password === password) {
      delete user.password;
      return user;
    }
    if (user && user.password !== password) {
      return;
    }
  } catch (error) {
    throw error;
  }
}

async function getUserByMobile(mobile) {
  try {
    const {
      rows: [users],
    } = await client.query(
      `
  SELECT username, mobile FROM users WHERE mobile=$1;
`,
      [mobile]
    );
    if (!users) return null;

    delete users.password;
    return users;
  } catch (error) {
    throw error;
  }
}

async function getUserByEmail(email) {
  try {
    const {
      rows: [users],
    } = await client.query(
      `
  SELECT username, email FROM users WHERE email=$1;
`,
      [email]
    );
    if (!users) return null;

    delete users.password;
    return users;
  } catch (error) {
    throw error;
  }
}

async function getUserByName(first_name, last_name) {
  try {
    const {
      rows: [users],
    } = await client.query(
      `
  SELECT username, first_name, last_name FROM users WHERE first_name=$1, last_name=$2;
`,
      [first_name, last_name]
    );
    if (!users) return null;

    delete users.password;
    return users;
  } catch (error) {
    throw error;
  }
}

const updateUser = async ({
  first_name,
  last_name,
  mobile,
  email,
  user_id
}) => {
  try {
    const { rows } = await client.query(
      `UPDATE users 
      SET first_name=($1) last_name=($2) mobile=($3) email=($4)
     WHERE user_id =($5)
      RETURNING *;`,
      [first_name, last_name, mobile, email, user_id]
    );
    return rows;
  } catch (error) {
    throw error;
  }
};





module.exports = {
  createUser,
  getUserById,
  getUserByUsername,
  getUser,
  getUserByMobile,
  getUserByEmail,
  getUserByName,
  updateUser
};
