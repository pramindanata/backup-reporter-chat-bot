import { Middleware } from 'telegraf';
import { BotContext } from '@/bot/modules/common';

export const startCommand: Middleware<BotContext> = (ctx) => {
  return ctx.reply(
    'Hi, i can assist you in reporting results of the backup process of certain projects. Please /register to receive those backup reports from me.',
  );
};
