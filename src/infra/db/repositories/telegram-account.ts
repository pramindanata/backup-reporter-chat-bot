import { TelegramAccountRepositoryContract } from '@/app/contracts/repositories';
import { ChunkCB } from '@/app/interface';
import { TelegramAccount } from '@/entities';
import { AbstractRepository, EntityRepository } from 'typeorm';
import { ORMTelegramAccount, ORMTelegramAccountMapper } from '../entities';
import { chunkById } from '../util';

@EntityRepository(ORMTelegramAccount)
export class ORMTelegramAccountRepository
  extends AbstractRepository<ORMTelegramAccount>
  implements TelegramAccountRepositoryContract {
  async getChunk(count: number, cb: ChunkCB<TelegramAccount>): Promise<void> {
    const query = this.repository.createQueryBuilder('telegramAccount');

    await chunkById<ORMTelegramAccount, TelegramAccount>({
      count,
      query,
      cb,
      IDQueryName: 'telegramAccount.id',
      idSelector: (item) => item.id,
      transform: (chunk) => chunk.map(ORMTelegramAccountMapper.toDomain),
    });
  }
}
