import {
  BackupReportLog,
  FailedReport,
  SuccessReport,
} from '@/domain/entities/backup-report-log';

export interface BackupReportLogRepositoryContract {
  createSuccessLog(detail: SuccessReport): Promise<BackupReportLog>;
  createFailedLog(detail: FailedReport): Promise<BackupReportLog>;
}
