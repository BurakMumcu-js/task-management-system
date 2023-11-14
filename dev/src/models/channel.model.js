const joi = require("joi");
const mongoose = require("mongoose");
const channelSchema = joi.object({
    _id: String,
    name:joi.string().min(3).max(30).required(),
    password:joi.string().min(8).regex(/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-])/).required(),
    creator:joi.string().min(2).max(30).required(),
    users:Array,
})

const Channel = mongoose.model("Channel",{
    _id:String,
    name:String,
    password:String,
    creator:String,
    users:Array,
});

module.exports = {
   Channel,
};