import { format } from 'date-fns';
import { SuccessReport } from '@/domain/entities';
import { formatToReadableFileSize } from '@/core/utils/file';
import { DateTimeFormat } from '@/adapters/constant';

export class SuccessBackupReportLogView {
  create(report: SuccessReport): string {
    const startedAt = new Date(report.startedAt);
    const finishedAt = new Date(report.finishedAt);
    const prettyStartedAt = format(startedAt, DateTimeFormat.Pretty);
    const prettyFinishedAt = format(finishedAt, DateTimeFormat.Pretty);
    const prettyFileSize = formatToReadableFileSize(report.fileSize);

    const message = `🟢 <b>Backup Report</b>\n\nProject Name: <b>${report.projectName}</b>\nStatus: <b>Success</b>\nComputer Name: <b>${report.computerName}</b>\nIP: <b>${report.ip}</b>\nStarted At: <b>${prettyStartedAt}</b>\nFinished At: <b>${prettyFinishedAt}</b>\nDB Name: <b>${report.dbName}</b>\nDB Type: <b>${report.dbType}</b>\n\n<b>[Result]</b>\nFile Size: <b>${prettyFileSize}</b>\nFile Path: <b>${report.filePath}</b>`;

    return message;
  }
}
