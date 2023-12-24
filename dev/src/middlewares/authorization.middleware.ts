import { Request, Response, NextFunction } from 'express';
import { AuthFailed, UserNotExists } from '../lib/error';

export interface AuthorizedRequest extends Request {
  user?: { id: number; username: string; isAdmin:boolean };
}

export const authorizationMiddleware = (req:AuthorizedRequest,res:Response,next:NextFunction) => {
    try {
        if(!req.user) throw UserNotExists;
        if(!req.user.isAdmin) throw AuthFailed;
        next();
    } 
    catch (error) {
        next(error);
    }
}