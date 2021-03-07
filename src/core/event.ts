import EventEmitter from 'events';
import { AnyEnum, EventListener } from '@/interface';

export abstract class BaseEvent<E extends AnyEnum, D extends Record<any, any>> {
  private eventEmitter: EventEmitter;
  private eventListenerDict: Record<string, boolean> = {};

  constructor() {
    this.eventEmitter = new EventEmitter();
  }

  emit<T extends E>(event: T, payload: D[T]): boolean {
    if (!this.shouldListenerExist(event)) {
      throw new ListenerNotFoundException(event);
    }

    return this.eventEmitter.emit(event, payload);
  }

  protected addListener<T extends E>(
    event: T,
    listener: EventListener<D[T]>,
  ): void {
    this.eventListenerDict[event] = true;
    this.eventEmitter.addListener(event, listener);
  }

  private shouldListenerExist(event: string): boolean {
    if (this.eventListenerDict[event]) {
      return true;
    }

    return false;
  }
}

class ListenerNotFoundException extends Error {
  constructor(event: string) {
    super(`Listener for event "${event}" does not found.`);
  }
}
