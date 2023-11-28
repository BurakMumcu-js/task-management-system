const {Channel} = require("../../models/channel.model");
const {addTaskMiddleware, doneTaskMiddleware} = require('../../middlewares/tasks.middleware')


const addTask = async (req, res) => {
    try {
        await addTaskMiddleware(req, res);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};


const doneTask = async (req, res) => {
    try {
       await doneTaskMiddleware(req,res)
    } catch (e) {
        res.status(500).json({message:e});
    }
}

module.exports = {
    addTask,
    doneTask,
}