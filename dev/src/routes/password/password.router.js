const passwordController = require('./password.controller');
const express = require('express');
const router = express.Router();
router.post('/change', passwordController.passwordChange);
router.get('/reset-password/:token',passwordController.passwordChangeScreen)
router.post('/reset-password/:token',passwordController.savePasswordScreen);
module.exports = router;