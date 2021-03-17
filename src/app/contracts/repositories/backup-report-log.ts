import {
  BackupReportLog,
  FailedReport,
  SuccessReport,
} from '@/entities/backup-report-log';

export interface BackupReportLogRepositoryContract {
  createSuccessLog(detail: SuccessReport): Promise<BackupReportLog>;
  createFailedLog(detail: FailedReport): Promise<BackupReportLog>;
}
