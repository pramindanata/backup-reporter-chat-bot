import { injectable } from 'tsyringe';
import { TelegramAccountRepository } from '@/shared/repositories';
import { TelegramAccount } from '@/shared/models';

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
