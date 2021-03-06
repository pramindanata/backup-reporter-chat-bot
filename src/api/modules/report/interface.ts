export interface SuccessReport {
  computerName: string;
  projectName: string;
  startedAt: string;
  finishedAt: string;
  ip: string;
  detail: SuccessReportDetail;
}

export interface FailedReport {
  computerName: string;
  projectName: string;
  startedAt: string;
  ip: string;
  detail: FailedReportDetail;
}

export interface SuccessReportDetail {
  name: string;
  type: 'PostgreSQL' | 'MySQL' | 'MongoDB';
  filePath: string;
  fileSize: number;
}

export interface FailedReportDetail {
  name: string;
  type: 'PostgreSQL' | 'MySQL' | 'MongoDB';
  message: string;
}
