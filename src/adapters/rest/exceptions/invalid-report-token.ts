import { BaseHTTPException } from './base-http';

export class InvalidTokenException extends BaseHTTPException {
  getBody(): Record<string, any> {
    return {
      code: 'INVALID_TOKEN',
      message: 'Invalid token given',
    };
  }

  getStatusCode(): number {
    return 401;
  }
}
