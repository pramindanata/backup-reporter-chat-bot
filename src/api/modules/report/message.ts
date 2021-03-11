import { format } from 'date-fns';
import { DateTimeFormat } from '@/shared/constant';
import { formatToReadableFileSize } from '@/shared/util/filesize';
import { SuccessReport, FailedReport } from './interface';

export function generateSuccessMessage(report: SuccessReport): string {
  const startedAt = new Date(report.startedAt);
  const finishedAt = new Date(report.finishedAt);
  const prettyStartedAt = format(startedAt, DateTimeFormat.Pretty);
  const prettyFinishedAt = format(finishedAt, DateTimeFormat.Pretty);
  const prettyFileSize = formatToReadableFileSize(report.fileSize);

  const message = `🟢 <b>Backup Report</b>\n\nProject Name: <b>${report.projectName}</b>\nStatus: <b>Success</b>\nComputer Name: <b>${report.computerName}</b>\nIP: <b>${report.ip}</b>\nStarted At: <b>${prettyStartedAt}</b>\nFinished At: <b>${prettyFinishedAt}</b>\nDB Name: <b>${report.dbName}</b>\nDB Type: <b>${report.dbType}</b>\n\n<b>[Result]</b>\nFile Size: <b>${prettyFileSize}</b>\nFile Path: <b>${report.filePath}</b>`;

  return message;
}

export function generateFailedMessage(report: FailedReport): string {
  const startedAt = new Date(report.startedAt);
  const prettyStartedAt = format(startedAt, DateTimeFormat.Pretty);

  const message = `🔴 <b>Backup Report</b>\n\nProject Name: <b>${report.projectName}</b>\nStatus: <b>Failed</b>\nComputer Name: <b>${report.computerName}</b>\nIP: <b>${report.ip}</b>\nStarted At: <b>${prettyStartedAt}</b>\nDB Name: <b>${report.dbName}</b>\nDB Type: <b>${report.dbType}</b>\n\n<b>[Message]</b>\n${report.message}`;

  return message;
}
