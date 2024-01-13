// const { registerUser, loginUser, addToBlacklist, isTokenBlacklisted } = require('../models/auth');
// const jwt = require('jsonwebtoken');

// exports.register = (req, res) => {
//   const { name, password } = req.body;
//   registerUser(name, password, (err, result) => {
//     if (err) {
//       console.error('Error registering user:', err);
//       return res.status(500).json({ error: 'Internal Server Error' });
//     }
//     res.status(201).json({ message: 'User registered successfully' });
//   });
// };

// exports.login = (req, res) => {
//   const { name, password } = req.body;
//   loginUser(name, password, (err, results) => {
//     if (err) {
//       console.error('Error during login:', err);
//       return res.status(500).json({ error: 'Internal Server Error' });
//     }
//     if (results.length > 0) {
//       const user = { name };
//       const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '1h', algorithm: 'HS256' });
//       res.status(200).json({ token });
//     } else {
//       res.status(401).json({ error: 'Invalid credentials' });
//     }
//   });
// };
