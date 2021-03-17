import { inject, injectable } from 'tsyringe';
import { User as TelegramUser } from 'typegram';
import { AccessToken } from '@/entities';
import { RT, UT } from '../constant';
import { AccessTokenRepositoryContract } from '../contracts/repositories';
import { ActivateAccessTokenUOWContract } from '../contracts/uow';

@injectable()
export class AccessTokenUseCase {
  constructor(
    @inject(RT.AccessTokenRepositoryContract)
    private accessTokenRepo: AccessTokenRepositoryContract,
    @inject(UT.ActivateAccessTokenUOWContract)
    private activateAccessTokenUOW: ActivateAccessTokenUOWContract,
  ) {}

  async getByValue(tokenValue: string): Promise<AccessToken | undefined> {
    return this.accessTokenRepo.getByValue(tokenValue);
  }

  async activate(accessToken: AccessToken, user: TelegramUser): Promise<void> {
    await this.activateAccessTokenUOW.execute(accessToken, user);
  }
}
