import { TelegramAccount } from '@/domain/entities';
import { ORMTelegramAccount } from './model';

export class ORMTelegramAccountMapper {
  static toDomain(model: ORMTelegramAccount): TelegramAccount {
    const account = new TelegramAccount({
      id: model.id,
      accountId: model.accountId,
      firstName: model.firstName,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
      accessToken: model.accessToken,
    });

    return account;
  }
}
