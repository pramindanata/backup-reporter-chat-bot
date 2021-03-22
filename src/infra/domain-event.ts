import { singleton } from 'tsyringe';
import { BaseEvent } from '@/core/event';
import { EventName, EventPayloadDict } from '@/domain/event';
import { DomainEventContract } from '@/domain/contracts';
import { SendFailedReport, SendSuccessReport } from '@/adapters/listeners';

@singleton()
export class DomainEvent
  extends BaseEvent<EventName, EventPayloadDict>
  implements DomainEventContract {
  constructor() {
    super();

    this.register();
  }

  private register() {
    this.addListener(EventName.SUCCESS_REPORT_RECEIVED, SendSuccessReport);
    this.addListener(EventName.FAILED_REPORT_RECEIVED, SendFailedReport);

    this.onError((err) => {
      console.error(err);
    });
  }
}
