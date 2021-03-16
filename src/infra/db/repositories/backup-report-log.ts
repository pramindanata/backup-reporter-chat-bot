import { AbstractRepository, EntityRepository } from 'typeorm';
import { BackupReportLogRepositoryContract } from '@/app/contracts/repositories';
import {
  BackupReportLog,
  BackupReportLogStatus,
  FailedReport,
  SuccessReport,
} from '@/entities';
import { ORMBackupReportLog, ORMBackupReportLogMapper } from '../entities';

@EntityRepository(ORMBackupReportLog)
export class ORMBackupReportLogRepository
  extends AbstractRepository<ORMBackupReportLog>
  implements BackupReportLogRepositoryContract {
  async createSuccessLog(report: SuccessReport): Promise<BackupReportLog> {
    const log = await this.repository.save({
      status: BackupReportLogStatus.SUCCESS,
      detail: report,
    });

    return ORMBackupReportLogMapper.toDomain(log);
  }

  async createFailedLog(report: FailedReport): Promise<BackupReportLog> {
    const log = await this.repository.save({
      status: BackupReportLogStatus.FAILED,
      detail: report,
    });

    return ORMBackupReportLogMapper.toDomain(log);
  }
}
