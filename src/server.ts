import express, { Express } from 'express';
import bodyParser from 'body-parser';
import 'express-async-errors';

import { createBot } from '@/bot';
import { config } from '@/config';

import { createRouter as createRootRouter } from '@/modules/root';
import { createRouter as createReportRouter } from '@/modules/report';
import { handleError } from '@/modules/common';

export function createServer(): Express {
  const app = express();
  const bot = createBot();

  bot.telegram.setWebhook(`${config.app.host}${config.bot.webhookPath}`);

  app.use(bot.webhookCallback(config.bot.webhookPath));
  app.use(bodyParser.json());

  app.use('/', createRootRouter());
  app.use('/report', createReportRouter());

  app.use(handleError());

  return app;
}
