import { RequestHandler } from 'express';

export interface MiddlewareFactory {
  create(...args: any[]): RequestHandler;
}
