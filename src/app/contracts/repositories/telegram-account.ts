import { TelegramAccount } from '@/entities';
import { ChunkCB } from '../../interface';

export interface TelegramAccountRepositoryContract {
  getChunk(count: number, cb: ChunkCB<TelegramAccount>): Promise<void>;
}
