import { RedisClient } from 'redis';
import { AnyEnum } from './interface';

export abstract class BasePubSub<
  ChannelEnum extends AnyEnum,
  PayloadDict extends Record<any, any>
> {
  private subscriberHandlerDict: Record<string, SubscriberHandler<any>> = {};

  constructor(private client: RedisClient) {}

  boot(): void {
    this.client.on('subscribe', (channel) => {
      console.log(`[x] PubSub channel "${channel}" subscribed`);
    });

    this.client.on('message', async (channel, message) => {
      const handler = this.subscriberHandlerDict[channel];

      if (handler) {
        const payload = JSON.parse(message);

        try {
          handler(payload);
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

  subscribe<C extends ChannelEnum>(
    channel: C,
    handler: SubscriberHandler<PayloadDict[C]>,
  ): void {
    this.client.subscribe(channel);

    if (this.subscriberHandlerDict[channel]) {
      throw new Error(`Handler for "${channel}" already exists.`);
    }

    this.subscriberHandlerDict[channel] = handler;
  }
}

type SubscriberHandler<T> = (payload: T) => Promise<void>;

export interface Subscriber<T> {
  handle: (payload: T) => Promise<void>;
}
