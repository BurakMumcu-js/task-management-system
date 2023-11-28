const express = require('express');
const {v4: uuidv4} = require("uuid");
const jwt = require("jsonwebtoken");
const { User } = require('../../models/user.model')
const {registerMiddleware} = require("../../middlewares/register.middleware");

const secretKey =  'secretKey';
const options = {
    expiresIn: '1h'
}

async function register  (req,res) {
   try {
     await registerMiddleware(req,res)
   }
    catch (err){
        res.status(500).json({
            error: 'hata basladi' + err + 'hata bitti',
        })
    }
}

module.exports = {
    register,
}
