import { format } from 'date-fns';
import { FailedReport } from '@/entities';
import { DateTimeFormat } from '@/adapters/constant';

export class FailedBackupReportLogView {
  create(report: FailedReport): string {
    const startedAt = new Date(report.startedAt);
    const prettyStartedAt = format(startedAt, DateTimeFormat.Pretty);

    const message = `🔴 <b>Backup Report</b>\n\nProject Name: <b>${report.projectName}</b>\nStatus: <b>Failed</b>\nComputer Name: <b>${report.computerName}</b>\nIP: <b>${report.ip}</b>\nStarted At: <b>${prettyStartedAt}</b>\nDB Name: <b>${report.dbName}</b>\nDB Type: <b>${report.dbType}</b>\n\n<b>[Message]</b>\n${report.message}`;

    return message;
  }
}
