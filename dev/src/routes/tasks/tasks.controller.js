const ChannelService = require('../../services/ChannelService')
const {ChannelNotExists, UserNotExists} = require("../../lib/error");

const addTask = async (req, res, next) => {
    try {
        const {title, content, user, channel, deadline} = req.body;
        const channelExist = await ChannelService.findOne({name: channel});

        if (!channelExist) {
            throw ChannelNotExists;
        }

        const channelId = channelExist._id;
        const userIndex = channelExist.users.findIndex((item) => item.name === user);

        if (userIndex !== -1) {
            channelExist.users[userIndex].tasks.push({
                title: title,
                content: content,
                deadline: deadline,
            });

            await ChannelService.findByIdAndUpdate(channelId, channelExist);

            res.status(200).json({message: 'Görev başarıyla eklendi'});
            next()
        } else {
            throw UserNotExists;
        }
    } catch (e) {
        next(e);
    }
};


const doneTask = async (req, res, next) => {
    try {
        const {index, userName, channelName} = req.body;
        const channel = await ChannelService.findOne({name: channelName});
        const user = channel.users.find(user => user.name === userName);
        user.tasks = user.tasks.filter((taskItem, currentIndex) => currentIndex !== index);
        await ChannelService.update(channel._id,channel);
        res.send('Task başarıyla tamamlandı');
    } catch (e) {
        next(e);
    }
}

module.exports = {
    addTask,
    doneTask,
}