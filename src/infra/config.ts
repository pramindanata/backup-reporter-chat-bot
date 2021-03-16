import { singleton } from 'tsyringe';
import { Environment } from './constant';
import { BaseConfig } from './core/config';

@singleton()
export class Config extends BaseConfig<ConfigKeyDict> {
  protected props: Record<string, any>;

  constructor() {
    super();

    const { env } = process;

    this.props = {
      app: {
        env: env.NODE_ENV || Environment.DEV,
      },
      rest: {
        host: env.REST_HOST || 'https://localhost',
        port: (env.REST_PORT && parseInt(env.REST_PORT)) || 4000,
        reportAuthToken: env.REST_REPORT_AUTH_TOKEN || '',
      },
      bot: {
        webhookPath: env.BOT_WEBHOOK_PATH || '/secret-webhook',
        token: env.BOT_TOKEN || 'my-secret-token',
      },
      redis: {
        host: env.REDIS_HOST || 'localhost',
        port: (env.REDIS_PORT && parseInt(env.REDIS_PORT)) || 6379,
        password: env.REDIS_PASSWORD || '',
        prefix: env.REDIS_PREFIX || '',
      },
    };
  }
}

interface ConfigKeyDict {
  'app.env': string;
  'rest.host': string;
  'rest.port': number;
  'rest.reportAuthToken': string;
  'bot.webhookPath': string;
  'bot.token': string;
  'redis.host': string;
  'redis.port': number;
  'redis.password': string;
  'redis.prefix': string;
}
