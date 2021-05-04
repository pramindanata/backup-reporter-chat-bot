import { injectable } from 'tsyringe';
import { BackupReportLogUseCase } from '@/domain/use-cases';
import { FailedReportReceivedEventPayload } from '@/domain/events';
import { EventListener } from '../contracts';

@injectable()
export class SendFailedReport implements EventListener {
  constructor(private useCase: BackupReportLogUseCase) {}

  async handle(payload: FailedReportReceivedEventPayload): Promise<void> {
    await this.useCase.sendFailedReportToAllAccount(payload.report);
  }
}
