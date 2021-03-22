import EventEmitter from 'events';
import { container } from '@/infra/container';
import { AnyEnum, Ctor } from './interface';

export abstract class BaseEvent<E extends AnyEnum, D extends Record<any, any>> {
  private eventEmitter: EventEmitter;
  private eventListenerDict: Record<string, Ctor<EventListener<D[any]>>> = {};

  constructor() {
    this.eventEmitter = new EventEmitter();
  }

  protected abstract register(): void;

  boot(onError?: OnError): void {
    this.register();

    for (const eventName in this.eventListenerDict) {
      const ctor = this.eventListenerDict[eventName];
      const listener = container.resolve(ctor);

      this.eventEmitter.addListener(eventName, (payload) => {
        listener.handle(payload).catch((err) => {
          this.eventEmitter.emit('error', err);
        });
      });
    }

    this.eventEmitter.on('error', async (err) => {
      if (onError) {
        await onError(err);

        return;
      }

      throw err;
    });
  }

  dispatch<T extends E>(event: T, payload: D[T]): boolean {
    if (!this.shouldListenerExist(event)) {
      throw new ListenerNotFoundException(event);
    }

    return this.eventEmitter.emit(event, payload);
  }

  listen<T extends E>(event: T, listenerCtor: Ctor<EventListener<D[T]>>): void {
    if (this.eventListenerDict[event]) {
      throw new Error(`Listener for event "${event}" already exists.`);
    }

    this.eventListenerDict[event] = listenerCtor;
  }

  private shouldListenerExist(event: string): boolean {
    if (this.eventListenerDict[event]) {
      return true;
    }

    return false;
  }
}

export interface EventListener<T> {
  handle: (payload: T) => Promise<void>;
}

class ListenerNotFoundException extends Error {
  constructor(event: string) {
    super(`Listener for event "${event}" does not found.`);
  }
}

type OnError = (err: any) => Promise<void>;
