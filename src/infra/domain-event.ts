import { singleton } from 'tsyringe';
import { BaseEvent } from '@/core/event';
import { EventName, EventPayloadDict } from '@/domain/event';
import { EventContract } from '@/domain/contracts';
import { SendFailedReport, SendSuccessReport } from '@/adapters/listeners';

@singleton()
export class DomainEvent
  extends BaseEvent<EventName, EventPayloadDict>
  implements EventContract {
  protected register(): void {
    this.listen(EventName.SUCCESS_REPORT_RECEIVED, SendSuccessReport);
    this.listen(EventName.FAILED_REPORT_RECEIVED, SendFailedReport);
  }
}
