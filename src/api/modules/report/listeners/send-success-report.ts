import { injectable } from 'tsyringe';
import { EventListener } from '@/core/event';
import { SuccessReport } from '../interface';
import { ReportService } from '../service';

@injectable()
export class SendSuccessReport implements EventListener<SuccessReport> {
  constructor(private reportService: ReportService) {}

  async handle(payload: SuccessReport): Promise<void> {
    await this.reportService.sendSuccessReportToAllAccount(payload);
  }
}
