import { inject, injectable } from 'tsyringe';
import {
  BackupReportLog,
  TelegramAccount,
  FailedReport,
  SuccessReport,
} from '@/domain/entities';
import { RT, ST, VT } from '../constant';
import {
  BackupReportLogRepositoryContract,
  TelegramAccountRepositoryContract,
} from '../contracts/repositories';
import {
  FailedBackupReportLogViewContract,
  SuccessBackupReportLogViewContract,
} from '../contracts/views';
import { TelegramServiceContract } from '../contracts/services';

@injectable()
export class BackupReportLogUseCase {
  constructor(
    @inject(RT.BackupReportLogRepositoryContract)
    private backupReportLogRepo: BackupReportLogRepositoryContract,
    @inject(RT.TelegramAccountRepositoryContract)
    private telegramAccountRepo: TelegramAccountRepositoryContract,
    @inject(VT.SuccessBackupReportLogViewContract)
    private successBackupReportLogView: SuccessBackupReportLogViewContract,
    @inject(VT.FailedBackupReportLogViewContract)
    private failedBackupReportLogView: FailedBackupReportLogViewContract,
    @inject(ST.TelegramServiceContract)
    private telegramService: TelegramServiceContract,
  ) {}

  async createSuccessLog(report: SuccessReport): Promise<BackupReportLog> {
    return this.backupReportLogRepo.createSuccessLog(report);
  }

  async createFailedLog(report: FailedReport): Promise<BackupReportLog> {
    return this.backupReportLogRepo.createFailedLog(report);
  }

  async sendSuccessReportToAllAccount(report: SuccessReport): Promise<void> {
    const maxAccountPerChunk = 15;
    const message = this.successBackupReportLogView.create(report);

    await this.telegramAccountRepo.getChunk(
      maxAccountPerChunk,
      async (chunk) => {
        await this.sendBulkTelegramMessage(chunk, message);
      },
    );
  }

  async sendFailedReportToAllAccount(report: FailedReport): Promise<void> {
    const maxAccountPerChunk = 15;
    const message = this.failedBackupReportLogView.create(report);

    await this.telegramAccountRepo.getChunk(
      maxAccountPerChunk,
      async (chunk) => {
        await this.sendBulkTelegramMessage(chunk, message);
      },
    );
  }

  private sendBulkTelegramMessage(chunk: TelegramAccount[], message: string) {
    return new Promise((resolve) => {
      const maxMSSendDurationPerChunk = 1000;

      setTimeout(async () => {
        await Promise.allSettled(
          chunk.map((account) => {
            return this.telegramService.sendMessage(account.accountId, message);
          }),
        );

        resolve(true);
      }, maxMSSendDurationPerChunk);
    });
  }
}
