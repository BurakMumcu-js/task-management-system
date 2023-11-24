const {Channel} = require("../models/channel.model");
const addTaskMiddleware = async (req, res, next) => {
    try {
        const { title, content, user, channel, deadline } = req.body;
        const channelExist = await Channel.findOne({ name: channel });

        if (!channelExist) {
            return res.status(500).json({ message: 'Kanal bulunamadı' });
        }

        const channelId = channelExist._id;
        const userIndex = channelExist.users.findIndex((item) => item.name === user);

        if (userIndex !== -1) {
            channelExist.users[userIndex].tasks.push({
                title: title,
                content: content,
                deadline: deadline,
            });

            await Channel.findByIdAndUpdate(channelId, channelExist);

            res.status(200).json({ message: 'Görev başarıyla eklendi' });
        } else {
            res.status(500).json({ message: 'Görev ekleme başarısız' });
        }
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

module.exports = {
    addTaskMiddleware,
}