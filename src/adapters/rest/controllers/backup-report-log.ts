import { singleton } from 'tsyringe';
import { Request, Response } from 'express';
import { FailedReport, SuccessReport } from '@/domain/entities';
import { BackupReportLogUseCase } from '@/domain/use-cases';
import { MyEventEmitter } from '@/core/event-emitter';
import { Event } from '@/domain/constant';
import {
  FailedReportReceivedEvent,
  SuccessReportReceivedEvent,
} from '@/domain/events';

@singleton()
export class BackupReportLogController {
  constructor(
    private useCase: BackupReportLogUseCase,
    private eventEmitter: MyEventEmitter,
  ) {}

  async success(req: Request, res: Response): Promise<any> {
    const { body } = req;
    const report = body as SuccessReport;

    await this.useCase.createSuccessLog(report);

    this.eventEmitter.emit(
      Event.SUCCESS_REPORT_RECEIVED,
      new SuccessReportReceivedEvent(report),
    );

    return res.send('OK');
  }

  async failed(req: Request, res: Response): Promise<any> {
    const { body } = req;
    const report = body as FailedReport;

    await this.useCase.createFailedLog(report);

    this.eventEmitter.emit(
      Event.FAILED_REPORT_RECEIVED,
      new FailedReportReceivedEvent(report),
    );

    return res.send('OK');
  }
}
