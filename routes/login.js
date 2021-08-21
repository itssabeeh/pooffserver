const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

router.post('/', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.json({ status: 'error', error: 'Invalid username/password' });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET
    );
    return res.json({
      status: 'ok',
      id: user._id,
      username: user.username,
      token,
    });
  }
  res.json({ status: 'error', error: 'Invalid username/password' });
});

module.exports = router;
