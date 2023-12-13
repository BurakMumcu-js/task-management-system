const channelsController = require('../controllers/channels.controller');
const express = require('express');
const {validateChannel} = require("../../middlewares/validate.middleware");
const router = express.Router();
router.post('/delete',channelsController.deleteChannel);
router.post('/create',validateChannel,channelsController.createChannel);
router.post('/add',channelsController.addChannel);
router.get('/',channelsController.findChannels);
module.exports = router;