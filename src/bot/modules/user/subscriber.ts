import { Telegram } from 'telegraf';
import { injectable } from 'tsyringe';
import {
  AccessTokenDeletedPayload,
  PubSubChannel,
  Subscriber,
} from '@/core/pubsub';

@injectable()
export class AccessTokenDeletedSubscriber
  implements Subscriber<PubSubChannel.AccessTokenDeleted> {
  constructor(private telegram: Telegram) {}

  async handle(payload: AccessTokenDeletedPayload): Promise<void> {
    const account = payload.telegramAccount;

    if (account) {
      await this.telegram.sendMessage(
        account.accountId,
        'Your access token has been removed. You can no longer receive any backup report from me.',
      );

      return;
    }
  }
}
