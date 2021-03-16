import { ObjectSchema } from 'joi';
import { injectable } from 'tsyringe';
import { Request, Response, NextFunction, RequestHandler } from 'express';
import { PayloadSource } from '@/core/utils/joi';
import { SchemaValidationException } from '../exceptions';
import { MiddlewareFactory } from './middleware-factory';

@injectable()
export class ValidateRequest implements MiddlewareFactory {
  create(schema: ObjectSchema, payloadSource: PayloadSource): RequestHandler {
    return (req: Request, res: Response, next: NextFunction) => {
      const { body, params, query } = req;
      let payload: any;

      if (payloadSource === 'body') {
        payload = body;
      } else if (payloadSource === 'params') {
        payload = params;
      } else {
        payload = query;
      }

      const result = schema.validate(payload);

      if (result.error) {
        throw new SchemaValidationException(result.error, payloadSource);
      }

      next();
    };
  }
}
