import { Middleware } from 'telegraf';
import { BotContext } from '@/bot/modules/shared';

export const helpCommand: Middleware<BotContext> = (ctx) => {
  return ctx.replyWithHTML(
    '<b>Commands</b>\n\n- /register - Register access token\n- /help - See this message again',
  );
};
