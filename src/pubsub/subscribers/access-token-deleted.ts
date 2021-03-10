import { PubSubChannel } from '@/shared/constant';
import { AccessTokenDeletedPayload, Subscriber } from '@/shared/interface';

export class AccessTokenDeletedSubscriber
  implements Subscriber<PubSubChannel.AccessTokenDeleted> {
  async handle(payload: AccessTokenDeletedPayload): Promise<void> {
    console.log(payload);
  }
}
