import { Report } from './interface';

export function generateMessage(report: Report): string {
  const { detail } = report;
  const message = `🟢 <b>Backup Report</b>\n\nProject Name: <b>${report.projectName}</b>\nStatus: <b>${report.status}</b>\nComputer Name: <b>${report.computerName}</b>\nIP: <b>${report.ip}</b>\nStarted At: <b>${report.startedAt}</b>\nFinished At: <b>${report.finishedAt}</b>\nDB Name: <b>${detail.name}</b>\nDB Type: <b>${detail.type}</b>\n\n<b>[Result]</b>\nFile Size: <b>${detail.fileSize}</b>\nFile Path: <b>${detail.filePath}</b>`;

  return message;
}
