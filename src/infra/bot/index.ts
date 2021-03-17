import { Scenes, session, Telegraf } from 'telegraf';
import { BotContext } from '@/adapters/bot/interface';
import { CommandID } from '@/adapters/bot/constant';
import { AuthController } from '@/adapters/bot/controllers';
import { Guest, handleError, SetupState } from '@/adapters/bot/middlewares';
import { RegisterScene } from '@/adapters/bot/scenes';
import { container } from '../container';
import {
  wrapController as c,
  wrapMiddleware as m,
  wrapScene as s,
} from './util';

export function createBot(): Telegraf<BotContext> {
  const bot = container.resolve<Telegraf<BotContext>>(Telegraf);
  const stage = new Scenes.Stage<BotContext>([s(RegisterScene)]);

  bot.use(session());
  bot.use(m(SetupState));
  bot.use(stage.middleware());

  bot.command(CommandID.REGISTER, m(Guest), c(AuthController, 'register'));

  bot.on('text', (ctx) => {
    return ctx.reply('Command does not found.');
  });

  bot.catch(handleError());

  return bot;
}
