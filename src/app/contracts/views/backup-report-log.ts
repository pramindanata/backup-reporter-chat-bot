import { FailedReport, SuccessReport } from '@/entities';

export interface SuccessBackupReportLogViewContract {
  create(report: SuccessReport): string;
}

export interface FailedBackupReportLogViewContract {
  create(report: FailedReport): string;
}
