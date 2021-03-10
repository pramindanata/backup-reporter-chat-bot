import { ObjectSchema } from 'joi';
import { RequestHandler, Request, Response, NextFunction } from 'express';
import { SchemaValidationException } from '../exceptions';
import { PayloadSource } from '../utils/joi';

export function validateSchema(
  schema: ObjectSchema,
  payloadSource: PayloadSource,
): RequestHandler {
  return (req: Request, rest: Response, next: NextFunction): any => {
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
