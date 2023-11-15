const tasksController = require('./tasks.controller')
const express = require('express');
const router = express.Router();
router.post('/add',tasksController.addTask);
module.exports = router;