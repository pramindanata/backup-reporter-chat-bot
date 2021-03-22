import Redis from 'redis';
import { Telegraf, Telegram } from 'telegraf';
import { DependencyContainer, instanceCachingFactory } from 'tsyringe';
import { InfraConfig } from '@/infra/config';
import { RedisClientToken } from '@/infra/constant';
import { RegisterDepedencyProviders } from '../interface';

export const registerInfraProviders: RegisterDepedencyProviders = (
  container: DependencyContainer,
) => {
  const config = container.resolve(InfraConfig);

  container.register(Telegraf, {
    useFactory: instanceCachingFactory(() => {
      const token = config.get('bot.token');
      const telegraf = new Telegraf(token);

      return telegraf;
    }),
  });

  container.register(Telegram, {
    useFactory: instanceCachingFactory(() => {
      const token = config.get('bot.token');
      const telegram = new Telegram(token);

      return telegram;
    }),
  });

  container.register(RedisClientToken, {
    useFactory: instanceCachingFactory(() => {
      return Redis.createClient({
        host: config.get('redis.host'),
        port: config.get('redis.port'),
        password: config.get('redis.password') || undefined,
        prefix: config.get('redis.prefix'),
      });
    }),
  });
};
