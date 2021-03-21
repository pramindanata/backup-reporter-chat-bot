import { BackupReportLogUseCase } from '@/domain/use-cases';
import { EventListener } from '@/core/event';
import { SuccessReport } from '@/domain/entities';
import { injectable } from 'tsyringe';

@injectable()
export class SendSuccessReport implements EventListener<SuccessReport> {
  constructor(private useCase: BackupReportLogUseCase) {}

  async handle(payload: SuccessReport): Promise<void> {
    await this.useCase.sendSuccessReportToAllAccount(payload);
  }
}
