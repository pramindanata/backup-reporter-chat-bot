import { injectable } from 'tsyringe';
import { AccessToken, AccessTokenActivationStatus } from '@/models';
import {
  AccessTokenRepository,
  TelegramAccountRepository,
} from '@/repositories';
import { User } from 'typegram';
import { ActivateAccessTokenUOW } from './activate-access-token-uow';

@injectable()
export class AuthService {
  constructor(
    private accessTokenRepository: AccessTokenRepository,
    private telegramAccountRepository: TelegramAccountRepository,
    private activateAccessTokenUOW: ActivateAccessTokenUOW,
  ) {}

  async getTokenByValue(value: string): Promise<AccessToken | undefined> {
    return this.accessTokenRepository.findOne({
      value,
    });
  }

  async activateToken(accessToken: AccessToken, user: User): Promise<void> {
    await this.activateAccessTokenUOW.execute(accessToken, user);
  }
}
