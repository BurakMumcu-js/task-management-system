const {Channel} = require('../../models/channel.model');
const {v4: uuidv4} = require("uuid");
const {User} = require("../../models/user.model");
const mongoose = require("mongoose");
const {ChannelNotExists,UserNotExists, UserExısts} = require("../../lib/error");
const express = require("express");

const createChannel = async (req, res,next) => {
    try {
        const {name, password, creatorMail} = req.body
        const channelExist = await Channel.find({name: name});
        if (channelExist === []) {
           throw ChannelNotExists
        } else {
            let channel = new Channel({
                name: name,
                password: password,
                creator: creatorMail,
                _id: uuidv4(),
                users: [{name: creatorMail, tasks: []}],
            })
            await channel.save();
            res.json({message: `${name} isimli kanalınız başarıyla oluşmuştur`,channel:channel});
        }
    } catch (error) {
        next(error)
    }
}

const deleteChannel = async (req,res,next) => {
    try {
        const {channelName} = req.body;
        const channel = await Channel.findOne({name: channelName});
        if (!channel) throw ChannelNotExists;
        await Channel.deleteOne({name: channelName});
        res.json({message: `${channelName} isimli kanal başarıyla silindi`});
    } catch (e) {
        next(e);
    }
}

async function addChannel(req, res) {
    try {
        const {emailAdded, channelName} = req.body;
        const channel = await Channel.find({name: channelName});
        const user = await User.findOne({email: emailAdded})
        if (!user) throw UserNotExists
        if (channel[0].users.includes(emailAdded)) throw UserExısts;
        else {
            const channelId = channel[0]._id;

            const result = await Channel.updateOne(
                {_id: channelId},
                {
                    $push: {
                        users: {
                            email: emailAdded,
                            tasks: [],
                        }
                    }
                }
            );

            mongoose.disconnect();

            res.json({message: 'Kullanıcı başarıyla eklendi', channel: result});
        }
    } catch (error) {
        next(error);
    }
}

async function findChannels(req, res,next) {
    try {
        const channels = await Channel.find();
        res.status(200).json(channels);
    } catch (error) {
        next(error)
    }
}



module.exports = {
    deleteChannel,
    findChannels,
    createChannel,
    addChannel,
}