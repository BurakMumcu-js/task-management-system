import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { UserNotExists } from '../lib/error';
import UserService from '../services/UserService';

require('dotenv').config({ path: 'src/.env' });

const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const user = await UserService.findOne({ email: email, password: password });

        if (!user) {
            throw UserNotExists;
        } else {
            const payload = {
                user: user,
            };
            const token = jwt.sign(payload, process.env.secretKey as string, process.env.options as jwt.SignOptions);
            
            res.json({ user: user, token: token });
            next();
        }
    } catch (error) {
        next(error);
    }
};

export default {
    login,
};
