import { Request, Response, NextFunction } from 'express';
import { AuthFailed, UserNotExists } from '../lib/error';

export interface AuthorizedRequest extends Request {
  user?: { id: number; username: string; role:string[] };
}

export const authorizationMiddleware = (requiredRoles: string[]) => {
    return (req: AuthorizedRequest, res: Response, next: NextFunction) => {
     try {
      if (!req.user) throw UserNotExists;

      const userRoles = req.user.role || [];
      const hasRequiredRoles = requiredRoles.every((role) => userRoles.includes(role));
  
      if (!hasRequiredRoles) {
        return res.status(403).json({ message: 'Forbidden - Insufficient privileges' });
      }
  
      next();
     } catch (error) {
      next(error);
     }
    };
  };