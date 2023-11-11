const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const register = require('register.controller')
router.post('/auth/register', register);
module.exports = router;