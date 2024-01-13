const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { registerUser, loginUser, addToBlacklist, isTokenBlacklisted } = require('../models/auth');
const authenticateToken = require('../middleware/authMiddleware');

// Register endpoint
router.post('/register', (req, res) => {
  const { name, password } = req.body;
  registerUser(name, password, (err, result) => {
    if (err) {
      console.error('Error registering user:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.status(201).json({ message: 'User registered successfully' });
  });
});

// Login endpoint
router.post('/login', (req, res) => {
  const { name, password } = req.body;
  loginUser(name, password, (err, results) => {
    if (err) {
      console.error('Error during login:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (results.length > 0) {
      const user = { name }; // Customize this with the user information from your database
      const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '1h', algorithm: 'HS256' });
      res.status(200).json({ token });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  });
});

// Logout endpoint
router.post('/logout', authenticateToken, (req, res) => {
    const { exp } = req.user;
    addToBlacklist(exp);
  
    res.status(200).json({ message: 'Logout successful' });
  });
  

// protected route using the authMiddleware
router.get('/protected', authenticateToken, (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const user = req.user;

    res.json({ message: 'This is a protected route!', user });
  } catch (error) {
    console.error('Error in protected route:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get user information after login
router.get('/user', authenticateToken, (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const user = req.user;

    res.json({ user });
  } catch (error) {
    console.error('Error in user route:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;



// const express = require('express');

// const authController = require('../controller/auth');

// const router = express.Router();

// router.get('/', authController.getAllUsers)

// router.post('/reg', authController.register)

// router.post('/login', authController.login)


// module.exports = router;
 

