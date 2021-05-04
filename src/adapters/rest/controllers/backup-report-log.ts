import { singleton } from 'tsyringe';
import { Request, Response } from 'express';
import { FailedReport, SuccessReport } from '@/domain/entities';
import { BackupReportLogUseCase } from '@/domain/use-cases';
import { MyEventEmitter } from '@/core/event-emitter';
import {
  Event,
  FailedReportReceivedEventPayload,
  SuccessReportReceivedEventPayload,
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
      Event.SuccessReportReceived,
      new SuccessReportReceivedEventPayload(report),
    );

    return res.send('OK');
  }

  async failed(req: Request, res: Response): Promise<any> {
    const { body } = req;
    const report = body as FailedReport;

    await this.useCase.createFailedLog(report);

    this.eventEmitter.emit(
      Event.FailedReportReceived,
      new FailedReportReceivedEventPayload(report),
    );

    return res.send('OK');
  }
}
