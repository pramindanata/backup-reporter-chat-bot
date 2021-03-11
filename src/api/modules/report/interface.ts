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
