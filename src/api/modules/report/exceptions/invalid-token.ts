import { HTTPException } from '@/api/modules/shared';

export class InvalidTokenException extends HTTPException {
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
