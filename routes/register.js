// const express = require('express');

// const router = express.Router();
// const User = require('../models/User');
// const bcrypt = require('bcryptjs');

// router.post('/', async (req, res) => {
//   const { username, password: plainTextPassword } = req.body;
//   if (!username || typeof username !== 'string') {
//     return res.json({ status: 'error', error: 'Invalid Username' });
//   }

//   if (!plainTextPassword || typeof plainTextPassword !== 'string') {
//     return res.json({ status: 'error', error: 'Invalid Password' });
//   }
//   if (plainTextPassword.length < 5) {
//     return res.json({
//       status: 'error',
//       error: 'password must be greater than 5 chars',
//     });
//   }

//   const password = await bcrypt.hashSync(plainTextPassword, 10);
//   try {
//     const RegisterdUser = await User.create({
//       username,
//       password,
//     });
//     res.json(RegisterdUser);
//   } catch (err) {
//     res.json({ status: 'error', error: err.message });
//   }
// });

// module.exports = router;
const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { username, password: plainTextPassword } = req.body;
    const userExists = await User.findOne({ username });
    if (userExists) {
      throw new Error('User already exists');
    }
    const password = await bcrypt.hashSync(plainTextPassword, 10);
    const user = await User.create({
      username,
      password,
    });
    if (user) {
      res.status(201).json({
        id: user._id,
        username: user.username,
      });
    } else {
      res.status(400);
      throw new Error('Error occured');
    }
  })
);

module.exports = router;
