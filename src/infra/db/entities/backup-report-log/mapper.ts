import { BackupReportLog } from '@/domain/entities/backup-report-log';
import { ORMBackupReportLog } from './model';

export class ORMBackupReportLogMapper {
  static toDomain(model: ORMBackupReportLog): BackupReportLog {
    const log = new BackupReportLog({
      id: model.id,
      status: model.status,
      detail: model.detail,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    });

    return log;
  }
}
