import { Router } from 'express';
import { container } from '@/container';
import { validateSchema } from '@/modules/common';
import { ReportController } from './controller';
import { storeSchema } from './schema';

export function createRouter(): Router {
  const router = Router();
  const controller = container.resolve(ReportController);
  const { store } = controller;

  router.post('/', validateSchema(storeSchema, 'body'), store.bind(controller));

  return router;
}
