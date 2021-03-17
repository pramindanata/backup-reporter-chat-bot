import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import toSnakeCaseKeys from 'snakecase-keys';
import toCamelCaseKeys from 'camelcase-keys';
import {
  BackupReportLogStatus,
  FailedReport,
  SuccessReport,
} from '@/entities/backup-report-log';

@Entity({
  name: 'backup_report_logs',
})
export class ORMBackupReportLog {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column({
    name: 'status',
  })
  status!: BackupReportLogStatus;

  @Column({
    name: 'detail',
    type: 'json',
    transformer: {
      from: toCamelCaseKeys,
      to: toSnakeCaseKeys,
    },
  })
  detail!: SuccessReport | FailedReport;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt!: Date;
}
