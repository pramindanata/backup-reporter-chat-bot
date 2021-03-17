import { ValidationError } from 'joi';
import { PayloadSource } from '@/core/utils/joi';
import { BaseHTTPException } from './base-http';

export interface SchemaValidationExceptionBody {
  data: {
    [key: string]: {
      message: string;
      context: any;
    }[];
  };
  source: PayloadSource;
}

export class SchemaValidationException extends BaseHTTPException {
  constructor(
    private error: ValidationError,
    private payloadSource: PayloadSource,
  ) {
    super('Schema validation error');
  }

  getBody(): Record<string, any> {
    const data: SchemaValidationExceptionBody['data'] = this.error.details.reduce(
      (prev, cur) => {
        const key = cur.path.join('.');

        if (!prev[key]) {
          prev[key] = [];
        }

        prev[key].push({
          message: cur.message,
          context: cur.context,
        });

        return prev;
      },
      {} as SchemaValidationExceptionBody['data'],
    );

    return {
      data,
      source: this.payloadSource,
    };
  }

  getStatusCode(): number {
    return 422;
  }
}
