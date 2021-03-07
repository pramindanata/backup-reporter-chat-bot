import { EntityRepository, Repository } from 'typeorm';
import { TelegramAccount } from '@/models';

type ChunkCB<T> = (chunk: T[], index: number) => Promise<void>;

@EntityRepository(TelegramAccount)
export class TelegramAccountRepository extends Repository<TelegramAccount> {
  async getChunk(count: number, cb: ChunkCB<TelegramAccount>): Promise<void> {
    let idStartAt = '0';
    let index = 0;

    while (true) {
      const chunkQuery = this.createQueryBuilder('telegramAccount')
        .where('telegramAccount.id > :idStartAt')
        .orderBy('telegramAccount.id', 'ASC')
        .limit(count)
        .setParameters({
          idStartAt,
        });

      const chunk = await chunkQuery.getMany();

      await cb(chunk, index);

      if (chunk.length === 0 || chunk.length < count) {
        break;
      }

      const lastId = chunk[chunk.length - 1].id;
      idStartAt = lastId;

      index += 1;
    }
  }
}
