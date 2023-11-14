const channelsController = require('./channels.controller');
const express = require('express');
const router = express.Router();
router.post('/create', channelsController.createChannel);
router.post('/add',channelsController.addChannel);
router.get('/',channelsController.findChannels);
router.get('/:id',channelsController.findChannelsByID);
module.exports = router;