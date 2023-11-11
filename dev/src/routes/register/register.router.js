const registerController = require('./register.controller');
const express = require('express');
const router = express.Router();
router.post('/register', registerController.register);
module.exports = router;
