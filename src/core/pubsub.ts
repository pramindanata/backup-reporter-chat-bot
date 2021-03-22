import { RedisClient } from 'redis';
import { AnyEnum } from './interface';

export abstract class BasePubSub<
  ChannelEnum extends AnyEnum,
  PayloadDict extends Record<any, any>
> {
  private subscriberHandlerDict: Record<string, SubscriberHandler<any>> = {};

  constructor(private client: RedisClient) {}

  /**
   * Register subscribers from here
   */
  protected abstract register(): void;

  boot(onError?: OnError): void {
    this.register();

    for (const channel in this.subscriberHandlerDict) {
      this.client.subscribe(channel);
    }

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
          if (onError) {
            await onError(err);

            return;
          }

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
    if (this.subscriberHandlerDict[channel]) {
      throw new Error(`Subscriber for channel "${channel}" already exists.`);
    }

    this.subscriberHandlerDict[channel] = handler;
  }
}

type SubscriberHandler<T> = (payload: T) => Promise<void>;
type OnError = (err: any) => Promise<void>;
