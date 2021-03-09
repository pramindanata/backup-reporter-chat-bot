import { NextFunction, Request, RequestHandler, Response } from 'express';
import { InvalidTokenException } from '../exceptions/invalid-token';
import { config } from '@/config';

export function checkToken(): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    const { report } = config;
    const { headers } = req;
    const token = headers['token'];

    if (token === report.authToken) {
      next();
    } else {
      throw new InvalidTokenException();
    }
  };
}
