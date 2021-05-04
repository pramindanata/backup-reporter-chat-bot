import { injectable } from 'tsyringe';
import { EventListener } from '@/core/event-emitter';
import { BackupReportLogUseCase } from '@/domain/use-cases';
import { SuccessReportReceivedEventPayload } from '@/domain/events';

@injectable()
export class SendSuccessReport implements EventListener {
  constructor(private useCase: BackupReportLogUseCase) {}

  async handle(payload: SuccessReportReceivedEventPayload): Promise<void> {
    await this.useCase.sendSuccessReportToAllAccount(payload.report);
  }
}
