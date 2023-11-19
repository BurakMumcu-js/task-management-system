const {Channel} = require("../../models/channel.model");

const addTask = async (req, res) => {
    try {
        const {title, content, user, channel,deadline} = req.body;
        const channelExist = await Channel.findOne({name: channel});
        if (!channelExist) {
            return res.status(500).json({message: 'Kanal bulunamadı'});
        }

        const channelId = channelExist._id;

        const userIndex = channelExist.users.findIndex(item => item.name === user);

        if (userIndex !== -1) {
            channelExist.users[userIndex].tasks.push({
                title: title,
                content: content,
                deadline:deadline,
            });


            await Channel.findByIdAndUpdate(channelId, channelExist);

            res.status(200).json({message: 'Görev başarıyla eklendi'});
        } else {
            res.status(500).json({message: 'görev ekleme başarısız'})
        }
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}

const doneTask = async (req, res) => {
    try {
        const { task, index, userName, channelName } = req.body;
        const channel = await Channel.findOne({ name: channelName });
        const user = channel.users.find(user => user.name === userName);
        console.log(index);
        user.tasks = user.tasks.filter((taskItem, currentIndex) => currentIndex !== index);
        console.log(user.tasks);
        await channel.save();
        res.send('Task başarıyla tamamlandı');
    } catch (e) {
        res.status(500).json({message:e.message});
    }
}

module.exports = {
    addTask,
    doneTask,
}