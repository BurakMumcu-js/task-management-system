const registerController = require('./register.controller');
const express = require('express');
const router = express.Router();
const {validateUser} = require('../../middlewares/validate.middleware');
router.post('/register',validateUser, registerController.register);
module.exports = router;
