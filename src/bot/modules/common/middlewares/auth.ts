import { Middleware } from 'telegraf';
import { UnauthenticatedException } from '../exceptions';
import { BotContext } from '../interface';

export function auth(): Middleware<BotContext> {
  return (ctx, next) => {
    if (ctx.state.user) {
      return next();
    }

    throw new UnauthenticatedException();
  };
}
