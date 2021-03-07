import { EntityRepository, Repository } from 'typeorm';
import { TelegramAccount } from '@/models';
import { chunkById } from '@/lib/typeorm';

type ChunkCB<T> = (chunk: T[], index: number) => Promise<void>;

@EntityRepository(TelegramAccount)
export class TelegramAccountRepository extends Repository<TelegramAccount> {
  async getChunk(count: number, cb: ChunkCB<TelegramAccount>): Promise<void> {
    const query = this.createQueryBuilder('telegramAccount');

    await chunkById({
      count,
      query,
      cb,
      IDQueryName: 'telegramAccount.id',
      idSelector: (item) => item.id,
    });
  }
}
