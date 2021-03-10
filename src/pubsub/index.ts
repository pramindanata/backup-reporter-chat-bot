import { PubSub } from '@/core/pubsub';
import { PubSubChannel } from '@/shared/constant';
import { container } from '@/container';
import { AccessTokenDeletedSubscriber } from './subscribers';

export function attachSubscribers(): void {
  const pubSub = container.resolve(PubSub);
  const { AccessTokenDeleted } = PubSubChannel;

  pubSub.subscribe(AccessTokenDeleted, AccessTokenDeletedSubscriber);
}
