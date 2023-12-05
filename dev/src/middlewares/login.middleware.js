const jwt = require("jsonwebtoken");
const { User } = require('../models/user.model')
const secretKey = process.env.secretKey
const options = {
    expiresIn: process.env.expireIn
}

const loginMiddleware = async (req,res,next) => {
    try {
        const {email,password} = req.body;
        const users = await User.find({email:email,password:password});
        if (!users){
            res.status(500).json({message:'hatalı bilgi giriş'})
        }
        else {
            const payload = {
                user:users[0]
            }
            const token = jwt.sign(payload,secretKey,options);
            res.json({user:users[0],token:token})
        }
    }
    catch (error){
        res.status(500).json({message:error.message})
    }
}

module.exports = {
    loginMiddleware,
}