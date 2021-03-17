import { RedisClient } from 'redis';
import { container } from 'tsyringe';
import { AnyEnum, Ctor } from './interface';

export abstract class BasePubSub<
  ChannelEnum extends AnyEnum,
  PayloadDict extends Record<any, any>
> {
  private subscriberCtorDict: Record<string, Ctor<Subscriber<any>>> = {};

  constructor(private client: RedisClient) {}

  /**
   * Register subscribers from this method by
   * using `this.subscribe()`.
   */
  protected abstract register(): void;

  boot(): void {
    this.register();

    this.client.on('subscribe', (channel) => {
      console.log(`[x] PubSub channel "${channel}" subscribed`);
    });

    this.client.on('message', async (channel, message) => {
      const ctor = this.subscriberCtorDict[channel];

      if (ctor) {
        const instance = container.resolve(ctor);
        const payload = JSON.parse(message);

        try {
          await instance.handle(payload);
        } catch (err) {
          throw err;
        }
      }
    });
  }

  publish<C extends ChannelEnum>(channel: C, payload: PayloadDict[C]): boolean {
    let message: string;

    if (typeof payload !== 'string') {
      message = JSON.stringify(payload);
    } else {
      message = payload;
    }

    return this.client.publish(channel, message);
  }

  protected subscribe<C extends ChannelEnum>(
    channel: C,
    ctor: Ctor<Subscriber<PayloadDict[C]>>,
  ): void {
    this.client.subscribe(channel);

    if (this.subscriberCtorDict[channel]) {
      throw new Error(`Handler for "${channel}" already exists.`);
    }

    this.subscriberCtorDict[channel] = ctor;
  }
}

export interface Subscriber<T> {
  handle: (payload: T) => Promise<void>;
}
