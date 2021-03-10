import { Telegraf, Telegram } from 'telegraf';
import { getCustomRepository } from 'typeorm';
import Redis from 'redis';
import { container, instanceCachingFactory } from 'tsyringe';

import { config } from '@/config';
import { BotContext } from '@/bot/modules/shared';
import {
  AccessTokenRepository,
  TelegramAccountRepository,
} from '@/shared/repositories';
import { DepSymbol } from './shared/constant';

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

container.register(DepSymbol.RedisClient, {
  useFactory: instanceCachingFactory(() => {
    return Redis.createClient({
      host: config.redis.host,
      port: config.redis.port,
      password: config.redis.password || undefined,
      prefix: config.redis.prefix,
    });
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
