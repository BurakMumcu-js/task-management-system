import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserNotExists } from '../lib/error';
import dotenv from 'dotenv';
import UserService from '../services/UserService';
dotenv.config({ path: 'src/.env' });

export interface AuthenticatedRequest extends Request {
    user?: { id: number; username: string };
  }

export const authenticateMiddleware = (req:AuthenticatedRequest,res:Response,next:NextFunction) => {
    const token = req.headers.authorization;
    if(!token) throw UserNotExists;
    try {
        const decodedToken = jwt.verify(token,process.env.SECRET_KEY as string) as {userId : number};
        const userId = decodedToken.userId;
        const user = UserService.findOne({_id:userId});
        if(!user) throw UserNotExists;
        next();
    } catch (e) {
        next(e);
    }
}