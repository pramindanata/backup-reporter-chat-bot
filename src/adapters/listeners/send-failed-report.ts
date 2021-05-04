import { injectable } from 'tsyringe';
import { EventListener } from '@/core/event-emitter';
import { BackupReportLogUseCase } from '@/domain/use-cases';
import { FailedReportReceivedEvent } from '@/domain/events';

@injectable()
export class SendFailedReport implements EventListener {
  constructor(private useCase: BackupReportLogUseCase) {}

  async handle(payload: FailedReportReceivedEvent): Promise<void> {
    await this.useCase.sendFailedReportToAllAccount(payload.report);
  }
}
