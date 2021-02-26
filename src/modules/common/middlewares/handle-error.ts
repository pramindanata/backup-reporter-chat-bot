import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';
import { HTTPException } from '../exceptions';

export function handleError(): ErrorRequestHandler {
  return (err: Error, req: Request, res: Response, next: NextFunction): any => {
    if (err instanceof HTTPException) {
      const statusCode = err.getStatusCode();
      const body = err.getBody();

      return res.status(statusCode).json(body);
    }

    next(err);
  };
}
