import { EventName, EventPayloadDict } from '@/domain/event';

export interface EventContract {
  dispatch<E extends EventName>(
    event: E,
    payload: EventPayloadDict[E],
  ): boolean;
}
