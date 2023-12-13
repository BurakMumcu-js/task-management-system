const UserService = require('../services/UserService');
const jwt = require("jsonwebtoken");
const {UserNotExists} = require('../lib/error')
require('dotenv').config({path: 'src/.env'});
const login = async (req,res,next)=>{
        try {
            const {email,password} = req.body;
            const user = await UserService.findOne({email: email, password: password});
            if (!user){
              throw UserNotExists
            }
            else {
                const payload = {
                    user:user
                }
                const token = jwt.sign(payload,process.env.secretKey,process.env.options);
                res.json({user:user,token:token})
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