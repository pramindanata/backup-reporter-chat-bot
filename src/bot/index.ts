import { Telegraf, Scenes, session } from 'telegraf';
import { container } from '@/container';
import { auth, BaseException, BotContext } from './modules/common';
import { RegisterCommand, RegisterScene } from './modules/auth';
import { setupState } from './modules/user';

export function createBot(): Telegraf<BotContext> {
  const bot = container.resolve<Telegraf<BotContext>>(Telegraf);
  const stage = new Scenes.Stage<BotContext>([RegisterScene()]);

  bot.use(session());
  bot.use(setupState);
  bot.use(stage.middleware());

  RegisterCommand(bot);

  bot.command('yeet', auth, (ctx) => {
    return ctx.reply('Yeeeeees');
  });

  bot.on('text', (ctx) => {
    return ctx.reply('Yo...');
  });

  bot.catch(async (err, ctx) => {
    if (err instanceof BaseException) {
      await ctx.replyWithHTML(err.getMessage());

      if (ctx.callbackQuery) {
        await ctx.answerCbQuery();
      }

      return;
    }
  });

  return bot;
}
