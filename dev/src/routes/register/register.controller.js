const {v4: uuidv4} = require("uuid");
const jwt = require("jsonwebtoken");
const { User } = require('../../models/user.model')

require('dotenv').config({path: 'src/.env'});
const {UserExısts} = require('../../lib/error')

async function register  (req,res,next) {
    try {
        const {name, email, password} = req.body;
        const users = await User.find({email: email});
        if (users) {
            throw UserExısts
        }
        let user = new User(req.body)
        await user.save();
        const payload = {
            user: user
        }

        const token = jwt.sign(payload, process.env.secretKey, process.env.options);

        res.json({user: user, token: token})
    } catch (err) {
       next(err)
    }
}

module.exports = {
    register,
}
