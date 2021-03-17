import { RedisClient } from 'redis';
import { inject, singleton } from 'tsyringe';
import { PubSubChannel } from '@/adapters/pubsub/constant';
import { PubSubPayloadDict } from '@/adapters/pubsub/interface';
import { BasePubSub } from '@/core/pubsub';
import { RedisClientToken } from '../constant';

@singleton()
export class PubSub extends BasePubSub<PubSubChannel, PubSubPayloadDict> {
  constructor(
    @inject(RedisClientToken)
    client: RedisClient,
  ) {
    super(client);
  }
}
