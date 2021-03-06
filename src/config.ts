import { Environment } from './constant';

const { env } = process;

export const config = {
  app: {
    env: env.NODE_ENV || Environment.DEV,
    port: env.APP_PORT || 4000,
    host: env.APP_HOST || 'https://localhost',
  },
  bot: {
    webhookPath: env.BOT_WEBHOOK_PATH || '/secret-webhook',
    token: env.BOT_TOKEN || 'my-secret-token',
  },
};
