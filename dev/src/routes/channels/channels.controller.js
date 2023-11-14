const {Channel} = require('../../models/channel.model');
const {v4: uuidv4} = require("uuid");
const mongoose = require('mongoose')

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
                users: [creatorMail],
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
        const { emailAddedBy, emailAdded, channelName } = req.body;
        const channel = await Channel.find({ name: channelName });

        if (channel[0].users.includes(emailAdded)) {
            return res.status(500).json({ message: 'Kullanıcı zaten mevcut' });
        } else {
            const channelId = channel[0]._id;

            // Güncelleme işlemi
            const result = await Channel.updateOne(
                { _id: channelId },
                { $push: { users: emailAdded } }
            );



            // Bağlantıyı kapat
            mongoose.disconnect();

            // Başarı durumunu istemciye bildir
            res.json({ message: 'Kullanıcı başarıyla eklendi', channel: result });
        }
    } catch (error) {
        console.error('Hata:', error);
        res.status(500).json({ message: 'Bir hata oluştu' });
    }
}


module.exports = {
    createChannel,
    addChannel,
}