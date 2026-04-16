const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { client } = require('../redisClient');

const router = express.Router();

// Generate JWT Header
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// Helper to get user by email
const getUserByEmail = async (email) => {
  const userId = await client.get(`email_to_id:${email}`);
  if (!userId) return null;
  const userJson = await client.get(`user:${userId}`);
  return userJson ? JSON.parse(userJson) : null;
};

// Helper to save user
const saveUser = async (user) => {
  await client.set(`user:${user._id}`, JSON.stringify(user));
  await client.set(`email_to_id:${user.email}`, user._id);
  // Add to all users set
  await client.sAdd('users:all', user._id);
  // Add to leaderboard
  await client.zAdd('users:leaderboard', {
    score: user.points || 0,
    value: user._id
  });
};

// @route   POST /api/auth/register
// @desc    Register a new user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const userExists = await getUserByEmail(email);
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {
      _id: crypto.randomUUID(),
      name,
      email,
      password: hashedPassword,
      isAdmin: false,
      points: 0,
      badges: [],
      workouts: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    await saveUser(newUser);

    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      token: generateToken(newUser._id),
    });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/auth/login
// @desc    Auth user & get token
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await getUserByEmail(email);

    // Handle hardcoded mock admin fallback
    if (email === 'admin@gmail.com' && password === '123456') {
      if (!user) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        user = {
          _id: crypto.randomUUID(),
          name: 'Super Admin',
          email: 'admin@gmail.com',
          password: hashedPassword,
          isAdmin: true,
          points: 0,
          badges: [],
          workouts: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        await saveUser(user);
      }
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
