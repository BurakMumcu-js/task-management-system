const jwt = require("jsonwebtoken");
const { User } = require('../../models/user.model')
const secretKey =  'secretKey';
const options = {
    expiresIn: '1h'
}
const login = async (req,res)=>{
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
    login
};