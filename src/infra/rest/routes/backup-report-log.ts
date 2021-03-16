import { Router } from 'express';
import { BackupReportLogController } from '@/adapters/rest/controllers';
import {
  ValidateBackupReportLogToken,
  ValidateRequest,
} from '@/adapters/rest/middlewares';
import {
  createFailedBackupReportLog,
  createSuccessBackupReportLog,
} from '@/adapters/rest/requests';
import { wrapController as c, wrapMiddleware as m } from '../util';

export function createBackupReportLogRouter(): Router {
  const router = Router();

  router.post(
    '/success',
    m(ValidateBackupReportLogToken),
    m(ValidateRequest, createSuccessBackupReportLog, 'body'),
    c(BackupReportLogController, 'success'),
  );

  router.post(
    '/failed',
    m(ValidateBackupReportLogToken),
    m(ValidateRequest, createFailedBackupReportLog, 'body'),
    c(BackupReportLogController, 'failed'),
  );

  return router;
}
