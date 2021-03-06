import { Middleware } from 'telegraf';
import { container } from '@/container';
import { BotContext } from '../common';
import { UserService } from './service';

export const setupState: Middleware<BotContext> = async (ctx, next) => {
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
