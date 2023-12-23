import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import * as jwt from 'jsonwebtoken';
import UserService from '../services/UserService';
import { UserExists } from '../lib/error';

require('dotenv').config({ path: 'src/.env' });

async function register(req: Request, res: Response, next: NextFunction) {
    try {
        console.log('register is coming');
        const { name, email, password } = req.body;
        const users = await UserService.findOne({ email: email });

        if (users) {
            throw UserExists;
        }

        let user = UserService.create({
            _id: uuidv4(),
            name: name,
            email: email,
            password: password,
        });

        const payload = {
            user: user,
        };

        const token = jwt.sign(payload, process.env.secretKey as string, process.env.options as jwt.SignOptions);
        
        res.json({ user: user, token: token });
    } catch (err) {
        next(err);
    }
}

export {
    register,
};
