require('dotenv').config();
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {
  getUserByUsername,
  createUser,
  getUserOrderHistoryById,
} = require('../db/users');
const { JWT_SECRET } = process.env;

//USER REGISTER
router.post('/register', async (req, res, next) => {
  const { username, password, first_name, last_name, mobile, email } = req.body;

  try {
    const _user = await getUserByUsername(username);

    if (_user) {
      next({
        name: 'UserExistsError',
        message: 'A user by that username already exists',
      });
    }

    const user = await createUser({
      username,
      password,
      first_name,
      last_name,
      mobile,
      email,
    });

    const token = jwt.sign(
      {
        id: user.id,
        username,
      },
      JWT_SECRET,
      {
        expiresIn: '1w',
      }
    );

    res.send({
      message: 'thank you for signing up',
      token,
    });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// USER LOGIN
router.post('/login', async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    next({
      name: 'MissingCredentialsError',
      message: 'Please supply both a username and password',
    });
  }

  try {
    const user = await getUserByUsername(username);
    if (user.username == username) {
      const token = jwt.sign(
        { id: user.id, username: user.username },
        JWT_SECRET
      );
      res.send({
        message: "you're logged in!",
        token: token,
        user: {
          id: user.id,
          username: user.username,
        },
      });
    } else {
      next({
        name: 'IncorrectCredentialsError',
        message: 'Username or password is incorrect',
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get('/order-history', async (req, res, next) => {
  try {
    const userOrderHistory = await getUserOrderHistoryById(1);

    if (userOrderHistory) {
      res.send(userOrderHistory);
    }
  } catch ({ name, message }) {
    {
      name, message;
    }
  }
});

router.get('/:username/orders', async (req, res, next) => {
  try {
    const products = await getAllProducts();
    if (products) {
      res.send(products);
    }
  } catch ({ name, message }) {
    {
      name, message;
    }
  }
});

module.exports = router;
