import { Request, Response, NextFunction } from 'express';
import { UserSchema } from '../models/user.model';
import { ChannelSchema } from '../models/channel.model';

const validateMiddleware = (schema: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body, { abortEarly: false });
      next();
    } catch (error) {
      next(error);
    }
  };
};

const validateUser = validateMiddleware(UserSchema);
const validateChannel = validateMiddleware(ChannelSchema);

export {
  validateUser,
  validateChannel,
};
