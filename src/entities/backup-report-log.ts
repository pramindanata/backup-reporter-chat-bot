export class BackupReportLog {
  id: string;
  status: BackupReportLogStatus;
  detail: SuccessReport | FailedReport;
  createdAt: Date;
  updatedAt: Date;

  constructor(props: BackupReportLogProps) {
    this.id = props.id;
    this.status = props.status;
    this.detail = props.detail;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  isSuccess(): boolean {
    return this.status === BackupReportLogStatus.SUCCESS;
  }
}

export interface BackupReportLogProps {
  id: string;
  status: BackupReportLogStatus;
  detail: SuccessReport | FailedReport;
  createdAt: Date;
  updatedAt: Date;
}

export enum BackupReportLogStatus {
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}

export interface SuccessReport {
  computerName: string;
  projectName: string;
  startedAt: string;
  finishedAt: string;
  ip: string;
  dbName: string;
  dbType: 'PostgreSQL' | 'MySQL' | 'MongoDB';
  filePath: string;
  fileSize: number;
}

export interface FailedReport {
  computerName: string;
  projectName: string;
  startedAt: string;
  ip: string;
  dbName: string;
  dbType: 'PostgreSQL' | 'MySQL' | 'MongoDB';
  message: string;
}
