// controllers/login.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');

router.get('/', (req, res) => {
  res.render('login');
});

router.post('/', async (req, res) => {
  const { username, password } = req.body;
  try {
    // Find the user by username
    const user = await User.findOne({ username });

    // If user not found, return error
    if (!user) {
      return res.status(400).send('Invalid username or password');
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If passwords don't match, return error
    if (!isPasswordValid) {
      return res.status(400).send('Invalid username or password');
    }

    // If username and password are correct, redirect to home page
    res.redirect('/');
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).send('Error logging in');
  }
});

module.exports = router;
