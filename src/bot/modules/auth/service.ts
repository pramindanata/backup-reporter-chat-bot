import { injectable } from 'tsyringe';
import { AccessToken } from '@/models';
import { AccessTokenRepository } from '@/repositories';
import { User } from 'typegram';
import { ActivateAccessTokenUOW } from './activate-access-token-uow';

@injectable()
export class AuthService {
  constructor(
    private accessTokenRepo: AccessTokenRepository,
    private activateAccessTokenUOW: ActivateAccessTokenUOW,
  ) {}

  async getTokenByValue(value: string): Promise<AccessToken | undefined> {
    return this.accessTokenRepo.findOne({
      value,
    });
  }

  async activateToken(accessToken: AccessToken, user: User): Promise<void> {
    await this.activateAccessTokenUOW.execute(accessToken, user);
  }
}
