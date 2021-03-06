import { Telegraf, Telegram } from 'telegraf';
import { container, instanceCachingFactory } from 'tsyringe';
import { config } from '@/config';
import { BotContext } from '@/bot/modules/common';

container.register<Telegraf<BotContext>>(Telegraf, {
  useFactory: instanceCachingFactory(() => {
    return new Telegraf<BotContext>(config.bot.token);
  }),
});

container.register(Telegram, {
  useFactory: instanceCachingFactory(() => {
    const bot = container.resolve(Telegraf);

    return bot.telegram;
  }),
});

export { container };
