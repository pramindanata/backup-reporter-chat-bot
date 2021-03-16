import express, { Express } from 'express';
import bodyParser from 'body-parser';
import 'express-async-errors';
import { createBackupReportLogRouter } from './routes';

export function createREST(): Express {
  const app = express();

  app.use(bodyParser.json());
  app.use('/report', createBackupReportLogRouter());

  // app.use(handleError());

  return app;
}
