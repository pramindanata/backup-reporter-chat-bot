import { injectable } from 'tsyringe';
import { Request, Response } from 'express';
import { BackupReportLogUseCase } from '@/app/use-cases';
import { FailedReport, SuccessReport } from '@/entities';

@injectable()
export class BackupReportLogController {
  constructor(private useCase: BackupReportLogUseCase) {}

  async success(req: Request, res: Response): Promise<any> {
    const { body } = req;
    const report = body as SuccessReport;

    await this.useCase.createSuccessLog(report);

    // this.event.emit(EventType.SUCCESS_REPORT_RECEIVED, report);

    return res.send('OK');
  }

  async failed(req: Request, res: Response): Promise<any> {
    const { body } = req;
    const report = body as FailedReport;

    await this.useCase.createFailedLog(report);

    // this.event.emit(EventType.FAILED_REPORT_RECEIVED, report);

    return res.send('OK');
  }
}
