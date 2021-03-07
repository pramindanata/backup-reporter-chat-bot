import { injectable } from 'tsyringe';
import { Telegram } from 'telegraf';
import { Request, Response } from 'express';
import { Event } from '@/api/event';
import { EventType } from '../common';
import { FailedReport, SuccessReport } from './interface';

@injectable()
export class ReportController {
  constructor(private event: Event) {}

  async success(req: Request, res: Response): Promise<any> {
    const { body } = req;
    const report = body as SuccessReport;

    this.event.emit(EventType.SUCCESS_REPORT_RECEIVED, report);

    return res.send('OK');
  }

  async failed(req: Request, res: Response): Promise<any> {
    const { body } = req;
    const report = body as FailedReport;

    this.event.emit(EventType.FAILED_REPORT_RECEIVED, report);

    return res.send('OK');
  }
}
