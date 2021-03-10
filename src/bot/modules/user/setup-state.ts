import { Middleware } from 'telegraf';
import { container } from '@/container';
import { BotContext } from '../shared';
import { UserService } from './service';

export function setupState(): Middleware<BotContext> {
  return async (ctx, next) => {
    const telegramService = container.resolve(UserService);
    const { id } = ctx.from!;
    const user = await telegramService.getDetailByAccountId(id);

    if (user) {
      ctx.state.user = user;
    } else {
      ctx.state.user = null;
    }

    return next();
  };
}
