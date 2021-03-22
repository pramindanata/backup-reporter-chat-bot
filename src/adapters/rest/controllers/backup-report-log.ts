import { inject, singleton } from 'tsyringe';
import { Request, Response } from 'express';
import { EventName } from '@/domain/event';
import { FailedReport, SuccessReport } from '@/domain/entities';
import { BackupReportLogUseCase } from '@/domain/use-cases';
import { EventContract } from '@/domain/contracts';
import { CT } from '@/domain/constant';

@singleton()
export class BackupReportLogController {
  constructor(
    private useCase: BackupReportLogUseCase,
    @inject(CT.DomainEventContract)
    private event: EventContract,
  ) {}

  async success(req: Request, res: Response): Promise<any> {
    const { body } = req;
    const report = body as SuccessReport;

    await this.useCase.createSuccessLog(report);

    this.event.dispatch(EventName.SUCCESS_REPORT_RECEIVED, report);

    return res.send('OK');
  }

  async failed(req: Request, res: Response): Promise<any> {
    const { body } = req;
    const report = body as FailedReport;

    await this.useCase.createFailedLog(report);

    this.event.dispatch(EventName.FAILED_REPORT_RECEIVED, report);

    return res.send('OK');
  }
}
