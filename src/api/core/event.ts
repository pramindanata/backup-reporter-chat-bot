import { singleton } from 'tsyringe';
import { BaseEvent } from '@/core';
import { SendFailedReport, SendSuccessReport } from '../modules/report';
import { EventTypePayloadDict } from '../interface';
import { EventType } from '../constant';

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
