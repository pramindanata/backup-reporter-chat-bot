import { Telegraf } from 'telegraf';
import { container } from '@/container';

export function createBot(): Telegraf {
  const bot = container.resolve<Telegraf>(Telegraf);

  bot.on('text', (ctx) => {
    return ctx.reply('Yo...');
  });

  return bot;
}
