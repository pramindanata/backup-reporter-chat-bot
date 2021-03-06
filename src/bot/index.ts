import { Telegraf, Scenes, session } from 'telegraf';
import { container } from '@/container';
import { BotContext } from './modules/common';
import { RegisterCommand, RegisterScene } from './modules/auth';

export function createBot(): Telegraf<BotContext> {
  const bot = container.resolve<Telegraf<BotContext>>(Telegraf);
  const stage = new Scenes.Stage<BotContext>([RegisterScene()]);

  bot.use(session());
  bot.use(stage.middleware());

  RegisterCommand(bot);

  bot.on('text', (ctx) => {
    console.log(123);
    return ctx.reply('Yo...');
  });

  return bot;
}
