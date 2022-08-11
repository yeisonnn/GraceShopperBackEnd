require('dotenv').config();
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {
  getUserByUsername,
  createUser,
  getUserOrderHistoryById,
  updateUser,
  getUserById,
} = require('../db/users');
const { requireUser } = require('./utils');
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
        id: user.user_id,
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
        { id: user.user_id, username: user.username },
        JWT_SECRET
      );
      res.send({
        message: "you're logged in!",
        token: token,
        user: {
          id: user.user_id,
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

router.get('/order-history', requireUser, async (req, res, next) => {
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

router.get('/:username/orders', requireUser, async (req, res, next) => {
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

// router.patch('/updateuser/:user_id', requireUser, async (req, res, next)=>{

//   try {
//     const {first_name, last_name, mobile, email} = req.body
//     const {user_id} = req.params

//     if(!originalUserData){
//       next({error})
//     }
//     const id = await getUserById(user_id)
//     const updateAddress = await updateUser({first_name, last_name, mobile, email, id})

//     res.send(updateAddress)

//   } catch ({name, message}) {
//     {
//       name, message
//     }
//   }
// })

router.patch('/:user_id/updateuser', requireUser, async (req, res, next) => {
  const { user_id } = req.params;
  const { first_name, last_name, mobile, email } = req.body;

  const updateFields = {};

  if (first_name) {
    updateFields.first_name = first_name;
  }

  if (last_name) {
    updateFields.last_name = last_name;
  }

  if (mobile) {
    updateFields.mobile = mobile;
  }
  if (email) {
    updateFields.email = email;
  }

  try {
    console.log('am i in?');
    const originalUserData = await getUserById(user_id);

    console.log(originalUserData, 'originalUserData');
    console.log(req.params.user_id, 'req params');

    if (originalUserData.user_id == req.params.user_id) {
      const updatedUserData = await updateUser(user_id, updateFields);
      res.send(updatedUserData);
    } else {
      next({
        name: 'UnauthorizedUserError',
        message: 'You cannot update stuff that is not yours',
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = router;
