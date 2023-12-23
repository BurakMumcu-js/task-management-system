import { NextFunction, Request, Response } from 'express';
import { ResponseError } from '../lib/error';

export const mainErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error.details) {
    res.status(400).json({ message: error.details.map((detail: any) => detail.message) });
  }

  if (error.name === 'JWT ERROR') {
    res.status(401).json({
      message: 'Not authenticated',
    });
  }

  if (error instanceof ResponseError) {
    res.status(error.status).json({
      message: error.message,
    });
  }

  res.status(500).json({
    message: 'Bir şeyler ters gitti',
  });
};
