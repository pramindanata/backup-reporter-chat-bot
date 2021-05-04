import EventEmitter from 'events';
import { singleton } from 'tsyringe';
import { ListenerHandler } from './interface';

@singleton()
export class MyEventEmitter {
  private eventEmitter: EventEmitter;

  constructor() {
    this.eventEmitter = new EventEmitter();
  }

  emit(name: string, payload: unknown): boolean {
    return this.eventEmitter.emit(name, payload);
  }

  on(name: string, handler: ListenerHandler): void {
    this.eventEmitter.on(name, handler);
  }
}
