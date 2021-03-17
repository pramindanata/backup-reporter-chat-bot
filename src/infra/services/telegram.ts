import { TelegramServiceContract } from '@/app/contracts/services';
import { Telegram } from 'telegraf';
import { injectable } from 'tsyringe';

@injectable()
export class TelegramService implements TelegramServiceContract {
  constructor(private telegram: Telegram) {}

  async sendMessage(chatId: string | number, message: string): Promise<void> {
    await this.telegram.sendMessage(chatId, message, {
      parse_mode: 'HTML',
    });
  }
}
