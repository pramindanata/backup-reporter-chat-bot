import { Router } from 'express';
import { container } from '@/container';
import { validateSchema } from '@/modules/common';
import { ReportController } from './controller';
import { successSchema, failedSchema } from './schema';

export function createRouter(): Router {
  const router = Router();
  const controller = container.resolve(ReportController);
  const { success, failed } = controller;

  router.post(
    '/success',
    validateSchema(successSchema, 'body'),
    success.bind(controller),
  );

  router.post(
    '/failed',
    validateSchema(failedSchema, 'body'),
    failed.bind(controller),
  );

  return router;
}
