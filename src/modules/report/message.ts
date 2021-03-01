import { SuccessReport, FailedReport } from './interface';

export function generateSuccessMessage(report: SuccessReport): string {
  const { detail } = report;
  const message = `🟢 <b>Backup Report</b>\n\nProject Name: <b>${report.projectName}</b>\nStatus: <b>Success</b>\nComputer Name: <b>${report.computerName}</b>\nIP: <b>${report.ip}</b>\nStarted At: <b>${report.startedAt}</b>\nFinished At: <b>${report.finishedAt}</b>\nDB Name: <b>${detail.name}</b>\nDB Type: <b>${detail.type}</b>\n\n<b>[Result]</b>\nFile Size: <b>${detail.fileSize}</b>\nFile Path: <b>${detail.filePath}</b>`;

  return message;
}

export function generateFailedMessage(report: FailedReport): string {
  const { detail } = report;
  const message = `🔴 <b>Backup Report</b>\n\nProject Name: <b>${report.projectName}</b>\nStatus: <b>Failed</b>\nComputer Name: <b>${report.computerName}</b>\nIP: <b>${report.ip}</b>\nStarted At: <b>${report.startedAt}</b>\nDB Name: <b>${detail.name}</b>\nDB Type: <b>${detail.type}</b>\n\n<b>[Message]</b>\n${detail.message}`;

  return message;
}
