const ChannelService = require('../services/ChannelService');
const {v4: uuidv4} = require("uuid");
const {User} = require("../models/user.model");
const mongoose = require("mongoose");
const {ChannelNotExists,UserNotExists, UserExısts,ChannelExists} = require("../lib/error");
const express = require("express");

const createChannel = async (req, res,next) => {
    try {
        const {name, password, creatorMail} = req.body
        const channelExist = await ChannelService.findOne({name: name});
        if (channelExist) {
           throw ChannelExists
        } else {
            let channel = new ChannelService.create({
                name: name,
                password: password,
                creator: creatorMail,
                _id: uuidv4(),
                users: [{name: creatorMail, tasks: []}],
            })
            res.status(200).json({message: `${name} isimli kanalınız başarıyla oluşmuştur`,channel:channel});
        }
    } catch (error) {
        next(error)
    }
}

const deleteChannel = async (req,res,next) => {
    try {
        const {channelName} = req.body;
        const channel = await ChannelService.findOne({name: channelName});
        if (!channel) throw ChannelNotExists;
        await ChannelService.delete({name: channelName});
        res.json({message: `${channelName} isimli kanal başarıyla silindi`});
    } catch (e) {
        next(e);
    }
}

async function addChannel(req, res,next) {
    try {
        const {emailAdded, channelName} = req.body;
        const channel = await ChannelService.findOne({name: channelName});
        const user = await User.findOne({email: emailAdded})
        if (!user) throw UserNotExists
        if (channel.users.includes(emailAdded)) throw UserExısts;
        else {
            const channelId = channel[0]._id;

            const result = await ChannelService.updateWhere(
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

            res.json({message: 'Kullanıcı başarıyla eklendi'});
        }
    } catch (error) {
        next(error);
    }
}

async function findChannels(req, res,next) {
    try {
        const channels = await ChannelService.list();
        res.status(200).json(channels);
        next();
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