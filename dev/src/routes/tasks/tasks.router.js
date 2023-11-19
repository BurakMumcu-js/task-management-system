const tasksController = require('./tasks.controller')
const express = require('express');
const router = express.Router();
router.post('/add',tasksController.addTask);
router.post('/done',tasksController.doneTask);
module.exports = router;