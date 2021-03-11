import { injectable } from 'tsyringe';
import { Telegram } from 'telegraf';
import {
  BackupReportLogRepository,
  TelegramAccountRepository,
} from '@/shared/repositories';
import { FailedReport, SuccessReport } from './interface';
import { generateFailedMessage, generateSuccessMessage } from './message';
import {
  BackupReportLog,
  BackupReportLogStatus,
  TelegramAccount,
} from '@/shared/models';

@injectable()
export class ReportService {
  constructor(
    private telegramAccountRepo: TelegramAccountRepository,
    private backupReportLogRepo: BackupReportLogRepository,
    private telegram: Telegram,
  ) {}

  async sendSuccessReportToAllAccount(report: SuccessReport): Promise<void> {
    const maxAccountPerChunk = 15;
    const message = generateSuccessMessage(report);

    await this.telegramAccountRepo.getChunk(
      maxAccountPerChunk,
      async (chunk) => {
        await this.sendBulkTelegramMessage(chunk, message);
      },
    );
  }

  async sendFailedReportToAllAccount(report: FailedReport): Promise<void> {
    const maxAccountPerChunk = 15;
    const message = generateFailedMessage(report);

    await this.telegramAccountRepo.getChunk(
      maxAccountPerChunk,
      async (chunk) => {
        await this.sendBulkTelegramMessage(chunk, message);
      },
    );
  }

  async createSuccessReportLog(
    report: SuccessReport,
  ): Promise<BackupReportLog> {
    return this.backupReportLogRepo.save({
      status: BackupReportLogStatus.SUCCESS,
      detail: report,
    });
  }

  async createFailedReportLog(report: FailedReport): Promise<BackupReportLog> {
    return this.backupReportLogRepo.save({
      status: BackupReportLogStatus.SUCCESS,
      detail: report,
    });
  }

  private sendBulkTelegramMessage(chunk: TelegramAccount[], message: string) {
    return new Promise((resolve) => {
      const maxMSSendDurationPerChunk = 1000;

      setTimeout(async () => {
        await Promise.allSettled(
          chunk.map((account) => {
            return this.telegram.sendMessage(account.accountId, message, {
              parse_mode: 'HTML',
            });
          }),
        );

        resolve(true);
      }, maxMSSendDurationPerChunk);
    });
  }
}
