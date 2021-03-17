import { Telegram } from 'telegraf';
import { injectable } from 'tsyringe';
import { AccessTokenDTO } from '@/adapters/dto';

@injectable()
export class AccessTokenController {
  constructor(private telegram: Telegram) {}

  async deleted(payload: AccessTokenDTO): Promise<void> {
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
