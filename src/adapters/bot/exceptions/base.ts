export abstract class BaseException extends Error {
  getMessage(): string {
    return this.message;
  }
}
