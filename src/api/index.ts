import express, { Express } from 'express';
import bodyParser from 'body-parser';
import 'express-async-errors';

import { createBot } from '@/bot';
import { config } from '@/config';

import { createRouter as createRootRouter } from '@/api/modules/root';
import { createRouter as createReportRouter } from '@/api/modules/report';
import { handleError } from '@/api/modules/common';
import { Environment } from '@/constant';

export function createServer(): Express {
  const app = express();
  const bot = createBot();

  if (config.app.env === Environment.PROD) {
    bot.telegram.setWebhook(`${config.app.host}${config.bot.webhookPath}`);
    app.use(bot.webhookCallback(config.bot.webhookPath));
  } else {
    bot.launch();
  }

  app.use(bodyParser.json());

  app.use('/', createRootRouter());
  app.use('/report', createReportRouter());

  app.use(handleError());

  return app;
}
