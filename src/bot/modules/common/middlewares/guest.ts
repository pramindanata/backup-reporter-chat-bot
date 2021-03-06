import { Middleware } from 'telegraf';
import { AlreadyAuthenticatedException } from '../exceptions';
import { BotContext } from '../interface';

export const guest: Middleware<BotContext> = (ctx, next) => {
  if (!ctx.state.user) {
    return next();
  }

  throw new AlreadyAuthenticatedException();
};
