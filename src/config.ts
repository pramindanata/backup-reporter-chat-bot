const { env } = process;

export const config = {
  app: {
    port: env.APP_PORT || 4000,
    host: env.APP_HOST || 'https://localhost',
  },
  bot: {
    webhookPath: env.BOT_WEBHOOK_PATH || '/secret-webhook',
    token: env.BOT_TOKEN || 'my-secret-token',
  },
};
