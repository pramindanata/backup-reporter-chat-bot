import { injectable } from 'tsyringe';
import { TelegramAccountRepository } from '@/repositories';
import { TelegramAccount } from '@/models';

@injectable()
export class UserService {
  constructor(private telegramAccountRepo: TelegramAccountRepository) {}

  getDetailByAccountId(
    accountId: number,
  ): Promise<TelegramAccount | undefined> {
    return this.telegramAccountRepo.findOne({
      accountId,
    });
  }
}
