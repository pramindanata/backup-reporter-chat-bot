import { EntityRepository, Repository } from 'typeorm';
import { BackupReportLog } from '@/shared/models';

@EntityRepository(BackupReportLog)
export class BackupReportLogRepository extends Repository<BackupReportLog> {}
