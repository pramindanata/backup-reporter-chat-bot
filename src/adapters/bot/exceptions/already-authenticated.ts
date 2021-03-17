import { BaseException } from './base';

export class AlreadyAuthenticatedException extends BaseException {
  constructor() {
    super('Already authenticated');
  }
}
