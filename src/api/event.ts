import { singleton } from 'tsyringe';
import { BaseEvent } from '@/core/event';
import { EventTypePayloadDict, EventType } from './modules/common';
import {
  failedReportReceivedListener,
  successReportReceivedListener,
} from './modules/report';

@singleton()
export class Event extends BaseEvent<EventType, EventTypePayloadDict> {
  constructor() {
    super();

    this.register();
  }

  private register() {
    this.addListener(
      EventType.SUCCESS_REPORT_RECEIVED,
      successReportReceivedListener,
    );

    this.addListener(
      EventType.FAILED_REPORT_RECEIVED,
      failedReportReceivedListener,
    );
  }
}
