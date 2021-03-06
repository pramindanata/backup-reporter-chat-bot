import { Telegraf, Scenes, session } from 'telegraf';
import { container } from '@/container';
import {
  auth,
  BotContext,
  Command,
  guest,
  handleException,
} from './modules/common';
import { registerCommand, RegisterScene } from './modules/auth';
import { setupState } from './modules/user';

export function createBot(): Telegraf<BotContext> {
  const bot = container.resolve<Telegraf<BotContext>>(Telegraf);
  const stage = new Scenes.Stage<BotContext>([RegisterScene()]);

  bot.use(session());
  bot.use(setupState);
  bot.use(stage.middleware());

  bot.command(Command.REGISTER, guest, registerCommand);

  bot.command('yeet', auth, (ctx) => {
    return ctx.reply('Yeeeeees');
  });

  bot.on('text', (ctx) => {
    return ctx.reply('Yo...');
  });

  bot.catch(handleException);

  return bot;
}
