import { injectable } from 'tsyringe';
import { EventListener } from '@/core/event-emitter';
import { BackupReportLogUseCase } from '@/domain/use-cases';
import { SuccessReportReceivedEvent } from '@/domain/events';

@injectable()
export class SendSuccessReport implements EventListener {
  constructor(private useCase: BackupReportLogUseCase) {}

  async handle(payload: SuccessReportReceivedEvent): Promise<void> {
    await this.useCase.sendSuccessReportToAllAccount(payload.report);
  }
}
