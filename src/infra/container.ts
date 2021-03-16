import { container } from 'tsyringe';
import { getCustomRepository } from 'typeorm';
import { DepToken as AppDepToken } from '@/app/constant';
import { ORMBackupReportLogRepository } from './db/repositories';

container.register(AppDepToken.BackupReportLogRepositoryContract, {
  useFactory: () => getCustomRepository(ORMBackupReportLogRepository),
});

export { container };
