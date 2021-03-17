import { Telegram } from 'telegraf';
import { injectable } from 'tsyringe';
import { Subscriber } from '@/core/pubsub';
import { AccessTokenDTO } from '@/adapters/dto';

@injectable()
export class AccessTokenDeletedSubscriber
  implements Subscriber<AccessTokenDTO> {
  constructor(private telegram: Telegram) {}

  async handle(payload: AccessTokenDTO): Promise<void> {
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
