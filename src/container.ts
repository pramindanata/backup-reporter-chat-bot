import { Telegraf, Telegram } from 'telegraf';
import { container, instanceCachingFactory } from 'tsyringe';
import { config } from '@/config';

container.register<Telegraf>(Telegraf, {
  useFactory: instanceCachingFactory(() => {
    return new Telegraf(config.bot.token);
  }),
});

container.register(Telegram, {
  useFactory: instanceCachingFactory(() => {
    const bot = container.resolve(Telegraf);

    return bot.telegram;
  }),
});

export { container };
