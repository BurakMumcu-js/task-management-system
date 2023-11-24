const tasksController = require('./tasks.controller')
const {addTaskMiddleware} = require('../../middlewares/tasks.middleware')
const express = require('express');
const router = express.Router();
router.use(addTaskMiddleware);
router.post('/add',tasksController.addTask);
router.post('/done',tasksController.doneTask);
module.exports = router;