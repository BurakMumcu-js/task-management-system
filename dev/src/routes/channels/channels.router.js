const channelsController = require('./channels.controller');
const express = require('express');
const router = express.Router();
router.post('/create', channelsController.createChannel);
module.exports = router;