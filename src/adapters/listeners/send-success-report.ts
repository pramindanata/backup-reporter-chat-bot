import { injectable } from 'tsyringe';
import { BackupReportLogUseCase } from '@/domain/use-cases';
import { SuccessReportReceivedEventPayload } from '@/domain/events';
import { EventListener } from '../contracts';

@injectable()
export class SendSuccessReport implements EventListener {
  constructor(private useCase: BackupReportLogUseCase) {}

  async handle(payload: SuccessReportReceivedEventPayload): Promise<void> {
    await this.useCase.sendSuccessReportToAllAccount(payload.report);
  }
}
