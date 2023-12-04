const {Channel} = require("../models/channel.model");
const {v4: uuidv4} = require("uuid");
const {User} = require("../models/user.model");
const mongoose = require("mongoose");

const createChannelMiddleware = async (req, res, next) => {
    try {
        const {name, password, creatorMail} = req.body
        const channelExist = await Channel.find({name: name});
        if (channelExist === []) {
            res.status(500).json({message: 'Böyle bir Kanal Bulunmaktadır'});
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

const addChannelMiddleware = async (req, res, next) => {
    try {
        const {emailAdded, channelName} = req.body;
        const channel = await Channel.find({name: channelName});
        const user = await User.findOne({email: emailAdded})
        if (!user) return res.status(500).json({message: 'böyle bir kullanıcı mevcut değil'});
        if (channel[0].users.includes(emailAdded)) return res.status(500).json({message: 'Kullanıcı zaten mevcut'});
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

const deleteChannelMiddleware = async (req, res,next) => {
    try {
        const {channelName} = req.body;
        const channel = await Channel.findOne({name: channelName});
        if (!channel) return res.status(404).json({message: 'kanal bulunamadı'});
        await Channel.deleteOne({name: channelName});
        res.json({message: `${channelName} isimli kanal başarıyla silindi`});
    } catch (e) {
        next(e);
    }
}


module.exports = {
    deleteChannelMiddleware,
    addChannelMiddleware,
    createChannelMiddleware,
}