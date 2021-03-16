import { Router } from 'express';
import { container } from '@/infra/container';
import { BackupReportLogController } from '@/adapters/rest/controllers';

export function createBackupReportLogRouter(): Router {
  const router = Router();
  const controller = container.resolve(BackupReportLogController);
  const { failed, success } = controller;

  router.post(
    '/success',
    // checkToken(),
    // validateSchema(successSchema, 'body'),
    success.bind(controller),
  );

  router.post(
    '/failed',
    // checkToken(),
    // validateSchema(failedSchema, 'body'),
    failed.bind(controller),
  );

  return router;
}
