import { singleton } from 'tsyringe';
import { BaseEvent } from '@/core/event';
import { FailedReport, SuccessReport } from '@/domain/entities';
import { SendFailedReport, SendSuccessReport } from './listeners';

@singleton()
export class Event extends BaseEvent<EventType, EventTypePayloadDict> {
  constructor() {
    super();

    this.register();
  }

  private register() {
    this.addListener(EventType.SUCCESS_REPORT_RECEIVED, SendSuccessReport);
    this.addListener(EventType.FAILED_REPORT_RECEIVED, SendFailedReport);

    this.onError((err) => {
      console.error(err);
    });
  }
}

export enum EventType {
  SUCCESS_REPORT_RECEIVED = 'SUCCESS_REPORT_RECEIVED',
  FAILED_REPORT_RECEIVED = 'FAILED_REPORT_RECEVIED',
}

interface EventTypePayloadDict {
  [EventType.SUCCESS_REPORT_RECEIVED]: SuccessReport;
  [EventType.FAILED_REPORT_RECEIVED]: FailedReport;
}
