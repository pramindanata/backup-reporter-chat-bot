import { Middleware } from 'telegraf';
import { injectable } from 'tsyringe';
import { UnauthenticatedException } from '../exceptions';
import { BotContext } from '../interface';
import { MiddlewareFactory } from './interface';

@injectable()
export class Auth implements MiddlewareFactory {
  create(): Middleware<BotContext> {
    return (ctx, next) => {
      if (ctx.state.user) {
        return next();
      }

      throw new UnauthenticatedException();
    };
  }
}
