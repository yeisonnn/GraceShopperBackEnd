const express = require('express');
const router = express.Router();
const { createUser } = require('../db/users');

//USER REGISTER
router.post('/register', async (req, res, next) => {
  const { username, password, first_name, last_name, mobile, email } = req.body;

  try {
    // const _user = await getUserByUsername(username);

    // if (_user) {
    //   next({
    //     name: 'UserExistsError',
    //     message: 'A user by that username already exists',
    //   });
    // }

    const user = await createUser({
      username,
      password,
      first_name,
      last_name,
      mobile,
      email,
    });

    // const token = jwt.sign(
    //   {
    //     id: user.id,
    //     username,
    //   },
    //   JWT_SECRET,
    //   {
    //     expiresIn: '1w',
    //   }
    // );

    res.send({
      message: 'thank you for signing up',
      token,
    });
  } catch ({ name, message }) {
    next({ name, message });
  }
});
