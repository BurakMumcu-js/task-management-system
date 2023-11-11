const express = require('express');
const {v4: uuidv4} = require("uuid");
const jwt = require("jsonwebtoken");
const { User } = require('../../models/user.model')

const secretKey =  'secretKey';
const options = {
    expiresIn: '1h'
}

async function register  (req,res) {
    try {

        const {name,email,password} = req.body;

        let user = new User({
            _id:uuidv4(),
            name:name,
            email:email,
            password:password,
            isAdmin:false,
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
            error: 'hata alındı',
        })
    }
}

module.exports = {
    register,
}
