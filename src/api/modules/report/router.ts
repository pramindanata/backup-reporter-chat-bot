import { Router } from 'express';
import { container } from '@/container';
import { validateSchema } from '@/api/modules/shared';
import { ReportController } from './controller';
import { successSchema, failedSchema } from './schema';
import { checkToken } from './middlewares';

export function createRouter(): Router {
  const router = Router();
  const controller = container.resolve(ReportController);
  const { success, failed } = controller;

  router.post(
    '/success',
    checkToken(),
    validateSchema(successSchema, 'body'),
    success.bind(controller),
  );

  router.post(
    '/failed',
    checkToken(),
    validateSchema(failedSchema, 'body'),
    failed.bind(controller),
  );

  return router;
}
