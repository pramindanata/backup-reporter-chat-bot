import { PubSubChannel, PubSubPayloadDict } from '../pubsub';

export interface PubSubContract {
  publish<C extends PubSubChannel>(
    channel: C,
    payload: PubSubPayloadDict[C],
  ): boolean;
}
