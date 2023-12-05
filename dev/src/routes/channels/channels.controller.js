const {Channel} = require('../../models/channel.model');
const {v4: uuidv4} = require("uuid");
const {createChannelMiddleware, addChannelMiddleware,deleteChannelMiddleware} = require("../../middlewares/channels.middleware");

const createChannel = async (req, res) => {
    try {
        await createChannelMiddleware(req, res);
    } catch (error) {
        res.status(500).json({
            error: error.message,
        })
    }
}

const deleteChannel = async (req,res) => {
    try {
        await deleteChannelMiddleware(req,res);
    }
    catch (error) {
        res.status(500).json({
            error: error.message,
        })
    }
}

async function addChannel(req, res) {
    try {
     await addChannelMiddleware(req,res);
    } catch (error) {
        res.status(500).json({message: 'Bir hata oluştu'});
    }
}

async function findChannels(req, res) {
    try {
        const channels = await Channel.find();
        res.status(200).json(channels);
    } catch (error) {
        res.status(500).json({message: 'Bir hata oluştu'});
    }
}



module.exports = {
    deleteChannel,
    findChannels,
    createChannel,
    addChannel,
}