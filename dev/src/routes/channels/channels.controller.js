const {Channel} = require('../../models/channel.model');
const {v4: uuidv4} = require("uuid");
const mongoose = require('mongoose')
const {User} = require("../../models/user.model");

const createChannel = async (req, res) => {
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
                users: [{name:creatorMail,tasks:[]}],
            })
            await channel.save();
            res.json({message: `${name} isimli kanalınız başarıyla oluşmuştur`});
        }
    } catch (error) {
        res.status(500).json({
            error: error.message,
        })
    }
}

async function addChannel(req, res) {
    try {
        const {emailAdded, channelName} = req.body;
        const channel = await Channel.find({name: channelName});
        const user = await User.findOne({email:emailAdded})
        if (!user) return res.status(500).json({message:'böyle bir kullanıcı mevcut değil'});
        if (channel[0].users.includes(emailAdded)) return res.status(500).json({message: 'Kullanıcı zaten mevcut'});
        else {
            const channelId = channel[0]._id;

            const result = await Channel.updateOne(
                {_id: channelId},
                {$push: {users: {
                   email: emailAdded,
                    tasks: [],
                        }}}
            );

            mongoose.disconnect();

            res.json({message: 'Kullanıcı başarıyla eklendi', channel: result});
        }
    } catch (error) {
        console.error('Hata:', error);
        res.status(500).json({message: 'Bir hata oluştu'});
    }
}

async function findChannels(req,res){
    try {
        const channels = await Channel.find();
        res.json(channels);
    } catch (error) {
        res.status(500).json({ message: 'Bir hata oluştu' });
    }
}

async function findChannelsByID(req,res){
    try {
        const channelId = req.params.id;

        const channel = await Channel.findById(channelId);

        if (!channel) {
            return res.status(404).json({ message: 'Kanal bulunamadı' });
        }

        res.json(channel);
    } catch (error) {
        res.status(500).json({ message: 'Bir hata oluştu' });
    }
}

module.exports = {
    findChannelsByID,
    findChannels,
    createChannel,
    addChannel,
}