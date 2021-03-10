import { Middleware } from 'telegraf';
import { AlreadyAuthenticatedException } from '../exceptions';
import { BotContext } from '../interface';

export function guest(): Middleware<BotContext> {
  return (ctx, next) => {
    if (!ctx.state.user) {
      return next();
    }

    throw new AlreadyAuthenticatedException();
  };
}
