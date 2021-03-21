import { Repository, EntityRepository } from 'typeorm';
import { BackupReportLogRepositoryContract } from '@/domain/contracts/repositories';
import {
  BackupReportLog,
  BackupReportLogStatus,
  FailedReport,
  SuccessReport,
} from '@/domain/entities';
import { ORMBackupReportLog, ORMBackupReportLogMapper } from '../entities';

@EntityRepository(ORMBackupReportLog)
export class ORMBackupReportLogRepository
  extends Repository<ORMBackupReportLog>
  implements BackupReportLogRepositoryContract {
  async createSuccessLog(report: SuccessReport): Promise<BackupReportLog> {
    const log = await this.save({
      status: BackupReportLogStatus.SUCCESS,
      detail: report,
    });

    return ORMBackupReportLogMapper.toDomain(log);
  }

  async createFailedLog(report: FailedReport): Promise<BackupReportLog> {
    const log = await this.save({
      status: BackupReportLogStatus.FAILED,
      detail: report,
    });

    return ORMBackupReportLogMapper.toDomain(log);
  }
}
