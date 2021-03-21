import { TelegramAccount } from '@/domain/entities';
import { ChunkCB } from '../../interface';

export interface TelegramAccountRepositoryContract {
  getChunk(count: number, cb: ChunkCB<TelegramAccount>): Promise<void>;
  getDetailByAccountId(accountId: number): Promise<TelegramAccount | undefined>;
}
