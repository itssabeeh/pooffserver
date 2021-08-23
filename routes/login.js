const express = require('express');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({
        id: user._id,
        username: user.username,
        token,
      });
    } else {
      res.status(400);
      throw new Error('Invalid Username/password');
    }
  })
);

module.exports = router;
