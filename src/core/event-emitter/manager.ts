import { inject, singleton } from 'tsyringe';
import { container } from '@/infra/container';
import { MyEventEmitter } from './event-emitter';
import { EventDictToken } from './constant';
import { EventDict, EventListener, OnError } from './interface';

@singleton()
export class EventEmitterManager {
  constructor(
    private eventEmitter: MyEventEmitter,
    @inject(EventDictToken)
    private eventDict: EventDict,
  ) {}

  boot(onError?: OnError): void {
    this.loadListeners();

    if (onError) {
      this.attachErrorListener(onError);
    }
  }

  private loadListeners(): void {
    for (const event in this.eventDict) {
      const listenerCtors = this.eventDict[event];

      if (listenerCtors.length > 0) {
        for (const ctor of listenerCtors) {
          const listener = container.resolve(ctor);

          this.attachListener(event, listener);
        }
      }
    }
  }

  private attachListener(event: string, listener: EventListener): void {
    this.eventEmitter.on(event, (args) => {
      const result = listener.handle(args);

      if (result instanceof Promise) {
        return result.catch((err) => {
          this.eventEmitter.emit('error', err);
        });
      }

      return result;
    });
  }

  private attachErrorListener(onError: OnError): void {
    this.eventEmitter.on('error', async (err) => {
      if (onError) {
        await onError(err);

        return;
      }

      throw err;
    });
  }
}
