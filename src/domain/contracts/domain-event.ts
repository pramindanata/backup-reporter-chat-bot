import { DomainEventName, DomainEventPayloadDict } from '@/domain/event';

export interface DomainEventContract {
  emit<E extends DomainEventName>(
    event: E,
    payload: DomainEventPayloadDict[E],
  ): boolean;
}
