import { inject, injectable } from 'tsyringe';
import { RedisClient } from 'redis';
import { DepSymbol } from '@/shared/constant';
import { AccessTokenDeletedSubscriber } from '@/bot/modules/user';
import { BasePubSub } from './base';
import { PubSubChannel } from './constant';

@injectable()
export class PubSub extends BasePubSub {
  constructor(
    @inject(DepSymbol.RedisClient)
    client: RedisClient,
  ) {
    super(client);
  }

  protected register(): void {
    const { AccessTokenDeleted } = PubSubChannel;

    this.subscribe(AccessTokenDeleted, AccessTokenDeletedSubscriber);
  }
}
