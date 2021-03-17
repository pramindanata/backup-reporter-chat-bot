import { inject, singleton } from 'tsyringe';
import { RedisClient } from 'redis';
import { BasePubSub } from '@/core/pubsub';
import { RedisClientToken } from './constant';
import {
  AccessTokenDeletedSubscriber,
  PubSubChannel,
  PubSubPayloadDict,
} from '@/adapters/pubsub';

@singleton()
export class PubSub extends BasePubSub<PubSubChannel, PubSubPayloadDict> {
  constructor(
    @inject(RedisClientToken)
    client: RedisClient,
  ) {
    super(client);
  }

  protected register(): void {
    const { AccessTokenDeleted } = PubSubChannel;

    this.subscribe(AccessTokenDeleted, AccessTokenDeletedSubscriber);
  }
}
