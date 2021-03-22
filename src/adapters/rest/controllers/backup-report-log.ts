import { inject, singleton } from 'tsyringe';
import { Request, Response } from 'express';
import { EventName } from '@/domain/event';
import { FailedReport, SuccessReport } from '@/domain/entities';
import { BackupReportLogUseCase } from '@/domain/use-cases';
import { DomainEventContract } from '@/domain/contracts';
import { CT } from '@/domain/constant';

@singleton()
export class BackupReportLogController {
  constructor(
    private useCase: BackupReportLogUseCase,
    @inject(CT.DomainEventContract)
    private event: DomainEventContract,
  ) {}

  async success(req: Request, res: Response): Promise<any> {
    const { body } = req;
    const report = body as SuccessReport;

    await this.useCase.createSuccessLog(report);

    this.event.emit(EventName.SUCCESS_REPORT_RECEIVED, report);

    return res.send('OK');
  }

  async failed(req: Request, res: Response): Promise<any> {
    const { body } = req;
    const report = body as FailedReport;

    await this.useCase.createFailedLog(report);

    this.event.emit(EventName.FAILED_REPORT_RECEIVED, report);

    return res.send('OK');
  }
}
