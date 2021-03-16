import { inject, injectable } from 'tsyringe';
import {
  BackupReportLog,
  FailedReport,
  SuccessReport,
} from '@/entities/backup-report-log';
import { DepToken } from '../constant';
import { BackupReportLogRepositoryContract } from '../contracts/repositories';

@injectable()
export class BackupReportLogUseCase {
  constructor(
    @inject(DepToken.BackupReportLogRepositoryContract)
    private backupReportLogRepo: BackupReportLogRepositoryContract,
  ) {}

  async createSuccessLog(report: SuccessReport): Promise<BackupReportLog> {
    return this.backupReportLogRepo.createSuccessLog(report);
  }

  async createFailedLog(report: FailedReport): Promise<BackupReportLog> {
    return this.backupReportLogRepo.createFailedLog(report);
  }
}
