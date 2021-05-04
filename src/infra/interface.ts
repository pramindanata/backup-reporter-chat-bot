import { Ctor } from '@/core/interface';
import { EventListener } from '@/adapters/contracts';

export interface EventListenerDict {
  [key: string]: Ctor<EventListener>[];
}
