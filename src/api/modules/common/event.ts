import { singleton } from 'tsyringe';
import { BaseEvent } from '@/core';
import {
  FailedReport,
  SendFailedReport,
  SendSuccessReport,
  SuccessReport,
} from '../report';
import { EventType } from '.';

interface EventTypePayloadDict {
  [EventType.SUCCESS_REPORT_RECEIVED]: SuccessReport;
  [EventType.FAILED_REPORT_RECEIVED]: FailedReport;
}

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
