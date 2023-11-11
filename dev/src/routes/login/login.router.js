const express = require('express');
const router = express.Router();
const {login} = require('login.controller')

router.post('/auth/login',login)

module.exports = router