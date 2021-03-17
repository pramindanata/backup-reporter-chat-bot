import { Middleware } from 'telegraf';
import { injectable } from 'tsyringe';
import { TelegramAccountUseCase } from '@/app/use-cases';
import { BotContext } from '../interface';
import { MiddlewareFactory } from './interface';

@injectable()
export class SetupState implements MiddlewareFactory {
  constructor(private telegramAccountUseCase: TelegramAccountUseCase) {}

  create(): Middleware<BotContext> {
    return async (ctx, next) => {
      const { id } = ctx.from!;
      const user = await this.telegramAccountUseCase.getDetailByAccountId(id);

      if (user) {
        ctx.state.user = user;
      } else {
        ctx.state.user = null;
      }

      return next();
    };
  }
}
