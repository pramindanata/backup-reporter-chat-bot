import { PubSubChannel } from '../pubsub/constant';
import { PubSubPayloadDict } from '../pubsub/interface';

export interface PubSubContract {
  publish<C extends PubSubChannel>(
    channel: C,
    payload: PubSubPayloadDict[C],
  ): boolean;
}
