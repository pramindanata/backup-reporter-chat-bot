import { Router } from 'express';
import { container } from '@/container';
import { RootController } from './controller';

export function createRouter(): Router {
  const router = Router();
  const controller = container.resolve(RootController);
  const { index } = controller;

  router.get('/', index.bind(controller));

  return router;
}
