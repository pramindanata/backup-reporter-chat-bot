import { injectable } from 'tsyringe';
import { EventListener } from '@/shared/interface';
import { FailedReport } from '../interface';
import { ReportService } from '../service';

@injectable()
export class SendFailedReport implements EventListener<FailedReport> {
  constructor(private reportService: ReportService) {}

  async handle(payload: FailedReport): Promise<void> {
    await this.reportService.sendFailedReportToAllAccount(payload);
  }
}
