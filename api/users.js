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
  getAllEmails,
} = require('../db/users');
const { requireUser } = require('./utils');
const { JWT_SECRET } = process.env;

//USER REGISTER
router.post('/register', async (req, res, next) => {
  const { username, password, first_name, last_name, mobile, email, admin } = req.body;

  try {
    const _user = await getUserByUsername(username);
    const allEmails = await getAllEmails();
    const existingEmail = allEmails.find((e) => e.email === email);

    if (existingEmail && Object.keys(existingEmail)) {
      next({
        name: 'EmailExistsError',
        message: 'This email is already taken',
      });
    }

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
      admin
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
    console.log(user, "user from back api")
    if (user.username == username && user.password == password) {
      const token = jwt.sign(
        { id: user.user_id, username: user.username, admin: user.admin},
        JWT_SECRET
      );
      res.send({
        message: "you're logged in!",
        token: token,
        user: {
          id: user.user_id,
          username: user.username,
          admin: user.admin
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

router.get('/:user_id/order-history', requireUser, async (req, res, next) => {
  try {
    const token = jwt.sign(
      { id: user.user_id},
      JWT_SECRET
    );
    const userOrderHistory = await getUserOrderHistoryById(token);

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
  const { first_name, last_name, mobile, email, admin } = req.body;

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
  if(admin) {
    updateFields.admin = admin;
  }

  try {
    const originalUserData = await getUserById(user_id);
    if (!originalUserData) {
      next({
        name: 'UnauthorizedUserError',
        message: 'This user does not exist!!',
      });
    }

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
