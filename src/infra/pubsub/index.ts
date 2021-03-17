import { PubSubChannel } from '@/adapters/pubsub/constant';
import { AccessTokenController } from '@/adapters/pubsub/controllers';
import { container } from '../container';
import { PubSub } from './pubsub';
import { wrapController as c } from './util';

export function createPubSub(): PubSub {
  const pubsub = container.resolve(PubSub);

  pubsub.subscribe(
    PubSubChannel.AccessTokenDeleted,
    c(AccessTokenController, 'deleted'),
  );

  return pubsub;
}
