import { singleton } from 'tsyringe';
import { BaseEvent } from '@/core/event';
import { DomainEventName, DomainEventPayloadDict } from '@/domain/event';
import { DomainEventContract } from '@/domain/contracts';
import { SendFailedReport, SendSuccessReport } from '@/adapters/listeners';

@singleton()
export class DomainEvent
  extends BaseEvent<DomainEventName, DomainEventPayloadDict>
  implements DomainEventContract {
  constructor() {
    super();

    this.register();
  }

  private register() {
    this.addListener(
      DomainEventName.SUCCESS_REPORT_RECEIVED,
      SendSuccessReport,
    );

    this.addListener(DomainEventName.FAILED_REPORT_RECEIVED, SendFailedReport);

    this.onError((err) => {
      console.error(err);
    });
  }
}
