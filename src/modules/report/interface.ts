export interface Report {
  status: 'Success' | 'Failed';
  computerName: string;
  projectName: string;
  startedAt: string;
  finishedAt: string;
  ip: string;
  detail: DBReportDetail;
}

export interface DBReportDetail {
  name: string;
  type: 'PostgreSQL' | 'MySQL' | 'MongoDB';
  filePath: string;
  fileSize: number;
}
