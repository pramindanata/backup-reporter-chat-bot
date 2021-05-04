import EventEmitter from 'events';
import { singleton } from 'tsyringe';

@singleton()
export class MyEventEmitter {
  private eventEmitter: EventEmitter;

  constructor() {
    this.eventEmitter = new EventEmitter();
  }

  emit(name: string | symbol, payload: unknown): boolean {
    return this.eventEmitter.emit(name, payload);
  }

  on(name: string, handler: ListenerHandler): void {
    this.eventEmitter.on(name, handler);
  }
}

type ListenerHandler = (...args: any[]) => void;
