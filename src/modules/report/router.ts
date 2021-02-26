import { Router } from 'express';
import { container } from '@/container';
import { ReportController } from './controller';

export function createRouter(): Router {
  const router = Router();
  const controller = container.resolve(ReportController);
  const { store } = controller;

  router.post('/', store.bind(controller));

  return router;
}
