import { Telegraf, Scenes, session } from 'telegraf';
import { container } from '@/container';
import { BotContext, Command, guest, handleException } from './modules/shared';
import { registerCommand, RegisterScene } from './modules/auth';
import { setupState } from './modules/user';
import { helpCommand, startCommand } from './modules/information';

export function createBot(): Telegraf<BotContext> {
  const bot = container.resolve<Telegraf<BotContext>>(Telegraf);
  const stage = new Scenes.Stage<BotContext>([RegisterScene()]);

  bot.use(session());
  bot.use(setupState());
  bot.use(stage.middleware());

  bot.command(Command.START, startCommand);
  bot.command(Command.HELP, helpCommand);
  bot.command(Command.REGISTER, guest(), registerCommand);

  bot.on('text', (ctx) => {
    return ctx.reply('Yo...');
  });

  bot.catch(handleException());

  return bot;
}
