import { TelegramAccountRepositoryContract } from '@/app/contracts/repositories';
import { ChunkCB } from '@/app/interface';
import { TelegramAccount } from '@/entities';
import { Repository, EntityRepository } from 'typeorm';
import { ORMTelegramAccount, ORMTelegramAccountMapper } from '../entities';
import { chunkById } from '../util';

@EntityRepository(ORMTelegramAccount)
export class ORMTelegramAccountRepository
  extends Repository<ORMTelegramAccount>
  implements TelegramAccountRepositoryContract {
  async getChunk(count: number, cb: ChunkCB<TelegramAccount>): Promise<void> {
    const query = this.createQueryBuilder('telegramAccount');

    await chunkById<ORMTelegramAccount, TelegramAccount>({
      count,
      query,
      cb,
      IDQueryName: 'telegramAccount.id',
      idSelector: (item) => item.id,
      transform: (chunk) => chunk.map(ORMTelegramAccountMapper.toDomain),
    });
  }

  async getDetailByAccountId(
    accountId: number,
  ): Promise<TelegramAccount | undefined> {
    const account = await this.findOne({
      accountId,
    });

    if (!account) {
      return undefined;
    }

    return ORMTelegramAccountMapper.toDomain(account);
  }
}
