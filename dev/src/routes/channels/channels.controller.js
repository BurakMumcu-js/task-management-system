const { Channel } = require('../../models/channel.model');
const {v4: uuidv4} = require("uuid");

const createChannel = async (req,res) => {
    try {
        const {name,password,creatorMail} = req.body
        const channelExist = await Channel.find({name:name});
        console.log(channelExist);
        if (channelExist === []){
            res.status(500).json({message:'Böyle bir Kanal Bulunmaktadır'});
        }
        else {
           let channel = new Channel ({
               name:name,
               password:password,
               creator: creatorMail,
               _id:uuidv4(),
               users:[creatorMail],
           })
          await channel.save();
           res.json({message:`${name} isimli kanalınız başarıyla oluşmuştur`});
        }
    }
    catch (error) {
        res.status(500).json({
            error: error.message,
        })
    }
}

module.exports = {
    createChannel,
}