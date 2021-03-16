export class BackupReportLog {
  id: string;
  status: BackupReportLogStatus;
  detail: SuccessReport | FailedReport;
  createdAt: Date;
  updatedAt: Date;

  constructor(payload: Payload) {
    this.id = payload.id;
    this.status = payload.status;
    this.detail = payload.detail;
    this.createdAt = payload.createdAt;
    this.updatedAt = payload.updatedAt;
  }

  isSuccess(): boolean {
    return this.status === BackupReportLogStatus.SUCCESS;
  }
}

interface Payload {
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
