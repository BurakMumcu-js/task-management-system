const {User} = require("../../models/user.model");
const jwt = require("jsonwebtoken");
const {UserNotExists} = require('../../lib/error')
require('dotenv').config({path: 'src/.env'});
const login = async (req,res,next)=>{
        try {
            const {email,password} = req.body;
            const users = await User.find({email:email,password:password});
            if (!users){
              throw UserNotExists
            }
            else {
                const payload = {
                    user:users[0]
                }
                const token = jwt.sign(payload,process.env.secretKey,process.env.options);
                res.json({user:users[0],token:token})
                next()
            }
        }
        catch (error){
            next(error);
        }
}

module.exports = {
    login
};