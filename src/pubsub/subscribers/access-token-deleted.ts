import {
  AccessTokenDeletedPayload,
  PubSubChannel,
  Subscriber,
} from '@/core/pubsub';

export class AccessTokenDeletedSubscriber
  implements Subscriber<PubSubChannel.AccessTokenDeleted> {
  async handle(payload: AccessTokenDeletedPayload): Promise<void> {
    console.log(payload);
  }
}
