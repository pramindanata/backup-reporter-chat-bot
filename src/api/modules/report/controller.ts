import { injectable } from 'tsyringe';
import { Request, Response } from 'express';
import { Event, EventType } from '@/core/event';
import { FailedReport, SuccessReport } from './interface';
import { ReportService } from './service';

@injectable()
export class ReportController {
  constructor(private event: Event, private service: ReportService) {}

  async success(req: Request, res: Response): Promise<any> {
    const { body } = req;
    const report = body as SuccessReport;

    await this.service.createSuccessReportLog(report);

    this.event.emit(EventType.SUCCESS_REPORT_RECEIVED, report);

    return res.send('OK');
  }

  async failed(req: Request, res: Response): Promise<any> {
    const { body } = req;
    const report = body as FailedReport;

    await this.service.createFailedReportLog(report);

    this.event.emit(EventType.FAILED_REPORT_RECEIVED, report);

    return res.send('OK');
  }
}
