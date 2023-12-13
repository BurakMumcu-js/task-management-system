const {v4: uuidv4} = require("uuid");
const jwt = require("jsonwebtoken");
const UserService = require('../services/UserService');
require('dotenv').config({path: 'src/.env'});
const {UserExısts} = require('../lib/error')

async function register  (req,res,next) {
    try {
        const {name, email, password} = req.body;
        const users = await UserService.findOne({email: email});
        if (users) {
            throw UserExısts
        }
        let user = new UserService.create(req.body)
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
