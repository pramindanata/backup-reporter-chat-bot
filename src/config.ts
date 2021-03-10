import { Environment } from './constant';

const { env } = process;

export const config = {
  app: {
    env: env.NODE_ENV || Environment.DEV,
    port: env.APP_PORT || 4000,
    host: env.APP_HOST || 'https://localhost',
  },
  report: {
    authToken: env.REPORT_AUTH_TOKEN || '',
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
