import { format } from 'date-fns';
import { DateTimeFormat } from '@/constant';
import { formatToReadableFileSize } from '@/util/filesize';
import { SuccessReport, FailedReport } from './interface';

export function generateSuccessMessage(report: SuccessReport): string {
  const { detail } = report;
  const startedAt = new Date(report.startedAt);
  const finishedAt = new Date(report.finishedAt);
  const prettyStartedAt = format(startedAt, DateTimeFormat.Pretty);
  const prettyFinishedAt = format(finishedAt, DateTimeFormat.Pretty);
  const prettyFileSize = formatToReadableFileSize(detail.fileSize);

  const message = `🟢 <b>Backup Report</b>\n\nProject Name: <b>${report.projectName}</b>\nStatus: <b>Success</b>\nComputer Name: <b>${report.computerName}</b>\nIP: <b>${report.ip}</b>\nStarted At: <b>${prettyStartedAt}</b>\nFinished At: <b>${prettyFinishedAt}</b>\nDB Name: <b>${detail.name}</b>\nDB Type: <b>${detail.type}</b>\n\n<b>[Result]</b>\nFile Size: <b>${prettyFileSize}</b>\nFile Path: <b>${detail.filePath}</b>`;

  return message;
}

export function generateFailedMessage(report: FailedReport): string {
  const { detail } = report;
  const startedAt = new Date(report.startedAt);
  const prettyStartedAt = format(startedAt, DateTimeFormat.Pretty);

  const message = `🔴 <b>Backup Report</b>\n\nProject Name: <b>${report.projectName}</b>\nStatus: <b>Failed</b>\nComputer Name: <b>${report.computerName}</b>\nIP: <b>${report.ip}</b>\nStarted At: <b>${prettyStartedAt}</b>\nDB Name: <b>${detail.name}</b>\nDB Type: <b>${detail.type}</b>\n\n<b>[Message]</b>\n${detail.message}`;

  return message;
}
