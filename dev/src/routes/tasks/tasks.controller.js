const {Channel} = require("../../models/channel.model");
const {addTaskMiddleware} = require('../../middlewares/tasks.middleware')


const addTask = async (req, res) => {
    try {
        await addTaskMiddleware(req, res);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};


const doneTask = async (req, res) => {
    try {
        const { task, index, userName, channelName } = req.body;
        console.log(req.body);
        const channel = await Channel.findOne({ name: channelName });
        console.log(channel);
        const user = channel.users.find(user => user.name === userName);
        console.log(index);
        user.tasks = user.tasks.filter((taskItem, currentIndex) => currentIndex !== index);
        console.log(user.tasks);
        await channel.save();
        res.send('Task başarıyla tamamlandı');
    } catch (e) {
        res.status(500).json({message:e});
    }
}

module.exports = {
    addTask,
    doneTask,
}