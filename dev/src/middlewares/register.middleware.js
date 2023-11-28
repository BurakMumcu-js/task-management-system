const express = require('express');
const {v4: uuidv4} = require("uuid");
const jwt = require("jsonwebtoken");
const { User } = require('../../models/user.model')

const secretKey =  'secretKey';
const options = {
    expiresIn: '1h'
}

const registerMiddleware = async (req,res,next) => {
    try {

        const {name,email,password} = req.body;
        const users = await User.find({email:email});
        if (users){
            res.status(500).json({message:'Kullanıcı zaten mevcut'});
        }
        let user = new User({
            _id:uuidv4(),
            name:name,
            email:email,
            password:password,
            isAdmin:false,
            resetPasswordToken:null,
            resetPasswordExpires:null,
        })

        await user.save();
        const payload = {
            user:user
        }

        const token = jwt.sign(payload,secretKey,options);

        res.json({user:user,token:token})
    }
    catch (err){
        res.status(500).json({
            error: 'hata basladi' + err + 'hata bitti',
        })
}
}

module.exports = {
    registerMiddleware,
}