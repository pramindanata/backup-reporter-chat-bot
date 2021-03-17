import { BaseException } from './base';

export class UnauthenticatedException extends BaseException {
  constructor() {
    super('Unauthenticated');
  }
}
