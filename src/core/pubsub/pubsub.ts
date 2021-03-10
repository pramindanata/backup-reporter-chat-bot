import { RedisClient } from 'redis';
import { container, inject, singleton } from 'tsyringe';
import { DepSymbol } from '@/shared/constant';
import { Ctor } from '@/shared/interface';
import { PubSubChannel } from './constant';
import { PubSubPayloadDict, Subscriber } from './interface';

@singleton()
export class PubSub {
  private subscriberCtorDict: Record<
    string,
    Ctor<Subscriber<PubSubChannel>>
  > = {};

  constructor(
    @inject(DepSymbol.RedisClient)
    private client: RedisClient,
  ) {
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

  subscribe<C extends PubSubChannel>(
    channel: C,
    ctor: Ctor<Subscriber<C>>,
  ): void {
    this.client.subscribe(channel);

    if (this.subscriberCtorDict[channel]) {
      throw new Error(`Handler for "${channel}" already exists.`);
    }

    this.subscriberCtorDict[channel] = ctor;
  }

  publish<C extends PubSubChannel>(
    channel: C,
    payload: PubSubPayloadDict[C],
  ): boolean {
    let message: string;

    if (typeof payload !== 'string') {
      message = JSON.stringify(payload);
    } else {
      message = payload;
    }

    return this.client.publish(channel, message);
  }
}
