import EventEmitter from 'events';
import { AnyEnum, Ctor, EventListener } from '@/interface';
import { container } from '@/container';

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
    listenerCtor: Ctor<EventListener<D[T]>>,
  ): void {
    const listener = container.resolve(listenerCtor);

    this.eventListenerDict[event] = true;
    this.eventEmitter.addListener(event, (payload) => {
      listener.handle(payload).catch((err) => {
        this.eventEmitter.emit('error', err);
      });
    });
  }

  protected onError(listener: (payload: any) => void): void {
    this.eventEmitter.on('error', listener);
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
