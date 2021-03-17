import { Middleware } from 'telegraf';
import { BotContext } from '../interface';

export interface MiddlewareFactory {
  create(...args: any[]): Middleware<BotContext>;
}
