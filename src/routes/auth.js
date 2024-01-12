const express = require('express');

const authController = require('../controller/auth');

const router = express.Router();

router.get('/', authController.getAllUsers)

router.post('/', authController.register)

router.post('/login', authController.login)


module.exports = router;
 