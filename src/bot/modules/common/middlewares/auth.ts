import { Middleware } from 'telegraf';
import { UnauthenticatedException } from '../exceptions';
import { BotContext } from '../interface';

export const auth: Middleware<BotContext> = (ctx, next) => {
  if (ctx.state.user) {
    return next();
  }

  throw new UnauthenticatedException();
};
