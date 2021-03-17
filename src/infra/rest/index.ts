import express, { Express } from 'express';
import bodyParser from 'body-parser';
import 'express-async-errors';

import { handleError } from '@/adapters/rest/middlewares';
import { createBackupReportLogRouter } from './routes';
import { createBot } from '../bot';
import { container } from '../container';
import { InfraConfig } from '../config';
import { Environment } from '../constant';

export function createREST(): Express {
  const app = express();
  const bot = createBot();
  const config = container.resolve(InfraConfig);

  if (config.get('app.env') === Environment.PROD) {
    const restHost = config.get('rest.host');
    const botWebhookPath = config.get('bot.webhookPath');
    const fullBotWebhookPath = `${restHost}${botWebhookPath}`;

    bot.telegram.setWebhook(fullBotWebhookPath);
    app.use(bot.webhookCallback(botWebhookPath));
  } else {
    bot.launch();
  }

  app.use(bodyParser.json());
  app.use('/report', createBackupReportLogRouter());

  app.use(handleError());

  return app;
}
