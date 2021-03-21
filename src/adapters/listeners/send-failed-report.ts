import { BackupReportLogUseCase } from '@/domain/use-cases';
import { EventListener } from '@/core/event';
import { FailedReport } from '@/domain/entities';
import { injectable } from 'tsyringe';

@injectable()
export class SendFailedReport implements EventListener<FailedReport> {
  constructor(private useCase: BackupReportLogUseCase) {}

  async handle(payload: FailedReport): Promise<void> {
    await this.useCase.sendFailedReportToAllAccount(payload);
  }
}
