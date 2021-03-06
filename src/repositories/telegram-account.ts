import { EntityRepository, Repository } from 'typeorm';
import { TelegramAccount } from '@/models';

@EntityRepository(TelegramAccount)
export class TelegramAccountRepository extends Repository<TelegramAccount> {}
