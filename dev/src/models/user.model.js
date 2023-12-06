const joi = require("joi");
const Joi = require("joi");
const mongoose = require("mongoose");

const userSchema = joi.object({
    _id: String,
    name:Joi.string().min(3).max(30).required(),
    email:Joi.string().min(3).max(30).required(),
    password:Joi.string().min(8).regex(/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-])/).required(),
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    isAdmin: {
        type: Boolean,
        default: false
    },
})



const User = mongoose.model("User",{
    _id:String,
    name:String,
    email:String,
    password:String,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    isAdmin:Boolean
});

module.exports = {
    userSchema,
    User,
};