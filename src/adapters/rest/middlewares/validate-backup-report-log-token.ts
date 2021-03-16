import { injectable } from 'tsyringe';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { AdapterConfig } from '@/adapters/config';
import { InvalidTokenException } from '../exceptions';
import { MiddlewareFactory } from './middleware-factory';

@injectable()
export class ValidateBackupReportLogToken implements MiddlewareFactory {
  constructor(private config: AdapterConfig) {}

  create(): RequestHandler {
    return (req: Request, res: Response, next: NextFunction) => {
      const backupReportLogAuthToken = this.config.get(
        'backupReportLogAuthToken',
      );
      const { headers } = req;
      const token = headers['token'];

      if (token === backupReportLogAuthToken) {
        next();
      } else {
        throw new InvalidTokenException();
      }
    };
  }
}
