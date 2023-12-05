const channelsController = require('./channels.controller');
const express = require('express');
const router = express.Router();
router.post('/delete',channelsController.deleteChannel);
router.post('/create', channelsController.createChannel);
router.post('/add',channelsController.addChannel);
router.get('/',channelsController.findChannels);
module.exports = router;