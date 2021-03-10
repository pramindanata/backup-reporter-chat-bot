import { Telegraf, Telegram } from 'telegraf';
import { getCustomRepository } from 'typeorm';
import { container, instanceCachingFactory } from 'tsyringe';
import { config } from '@/config';
import { BotContext } from '@/bot/modules/common';
import {
  AccessTokenRepository,
  TelegramAccountRepository,
} from '@/shared/repositories';

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

container.register(AccessTokenRepository, {
  useFactory: () => {
    return getCustomRepository(AccessTokenRepository);
  },
});

container.register(TelegramAccountRepository, {
  useFactory: () => {
    return getCustomRepository(TelegramAccountRepository);
  },
});

export { container };
