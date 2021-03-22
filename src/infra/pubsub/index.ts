import { RedisClient } from 'redis';
import { inject, singleton } from 'tsyringe';
import { PubSubChannel } from '@/adapters/pubsub/constant';
import { PubSubPayloadDict } from '@/adapters/pubsub/interface';
import { AccessTokenController } from '@/adapters/pubsub/controllers';
import { BasePubSub } from '@/core/pubsub';
import { RedisClientToken } from '../constant';
import { wrapController as c } from './util';

@singleton()
export class PubSub extends BasePubSub<PubSubChannel, PubSubPayloadDict> {
  constructor(
    @inject(RedisClientToken)
    client: RedisClient,
  ) {
    super(client);
  }

  protected register(): void {
    this.subscribe(
      PubSubChannel.AccessTokenDeleted,
      c(AccessTokenController, 'deleted'),
    );
  }
}
