import { TelegramAccount } from '@/domain/entities';
import { inject, injectable } from 'tsyringe';
import { RT } from '../constant';
import { TelegramAccountRepositoryContract } from '../contracts/repositories';

@injectable()
export class TelegramAccountUseCase {
  constructor(
    @inject(RT.TelegramAccountRepositoryContract)
    private telegramAccountRepo: TelegramAccountRepositoryContract,
  ) {}

  getDetailByAccountId(
    accountId: number,
  ): Promise<TelegramAccount | undefined> {
    return this.telegramAccountRepo.getDetailByAccountId(accountId);
  }
}
