import { BackupReportLogUseCase } from '@/app/use-cases';
import { EventListener } from '@/core/event';
import { SuccessReport } from '@/entities';
import { injectable } from 'tsyringe';

@injectable()
export class SendSuccessReport implements EventListener<SuccessReport> {
  constructor(private useCase: BackupReportLogUseCase) {}

  async handle(payload: SuccessReport): Promise<void> {
    await this.useCase.sendSuccessReportToAllAccount(payload);
  }
}
