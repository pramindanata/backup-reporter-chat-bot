import { AccessToken } from '@/entities';
import { ORMTelegramAccountMapper } from '../telegram-account';
import { ORMAccessToken } from './model';

export class ORMAccessTokenMapper {
  static toDomain(model: ORMAccessToken): AccessToken {
    const accessToken = new AccessToken({
      id: model.id,
      name: model.name,
      value: model.value,
      shortValue: model.shortValue,
      activationStatus: model.activationStatus,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
      telegramAccountId: model.telegramAccountId,
      telegramAccount:
        model.telegramAccount &&
        ORMTelegramAccountMapper.toDomain(model.telegramAccount),
    });

    return accessToken;
  }
}
