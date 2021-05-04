import { inject, singleton } from 'tsyringe';
import { MyEventEmitter } from '@/core/event-emitter';
import { container } from '@/infra/container';
import { EventListener } from '@/adapters/contracts';
import { EventListenerDictToken } from './constant';
import { EventListenerDict } from './interface';

@singleton()
export class EventEmitterManager {
  constructor(
    private eventEmitter: MyEventEmitter,
    @inject(EventListenerDictToken)
    private eventListenerDict: EventListenerDict,
  ) {}

  boot(onError?: OnError): void {
    this.loadListeners();

    if (onError) {
      this.attachErrorListener(onError);
    }
  }

  private loadListeners(): void {
    for (const event in this.eventListenerDict) {
      const listenerCtors = this.eventListenerDict[event];

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

type OnError = (err: any) => Promise<void>;
