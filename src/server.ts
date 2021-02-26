import express, { Express } from 'express';
import bodyParser from 'body-parser';
import 'express-async-errors';

import { createBot } from '@/bot';
import { config } from '@/config';

import { createReportRouter, createRootRouter } from '@/modules';

export function createServer(): Express {
  const app = express();
  const bot = createBot();

  bot.telegram.setWebhook(`${config.app.host}${config.bot.webhookPath}`);

  app.use(bot.webhookCallback(config.bot.webhookPath));
  app.use(bodyParser.json());

  app.use('/', createRootRouter());
  app.use('/report', createReportRouter());

  return app;
}
