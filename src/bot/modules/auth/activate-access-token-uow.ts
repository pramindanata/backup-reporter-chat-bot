import { AccessToken, AccessTokenActivationStatus } from '@/shared/models';
import {
  AccessTokenRepository,
  TelegramAccountRepository,
} from '@/shared/repositories';
import { User } from 'typegram';
import { EntityManager, getConnection } from 'typeorm';

export class ActivateAccessTokenUOW {
  async execute(accessToken: AccessToken, user: User): Promise<void> {
    const queryRunner = getConnection().createQueryRunner();
    const { accessTokenRepo, telegramAccountRepo } = this.createRepos(
      queryRunner.manager,
    );

    await queryRunner.startTransaction();

    try {
      const telegramAccount = await telegramAccountRepo.save({
        accountId: user.id,
        firstName: user.first_name,
        username: user.username,
      });

      await accessTokenRepo.update(
        { id: accessToken.id },
        {
          activationStatus: AccessTokenActivationStatus.ACTIVATED,
          telegramAccount,
        },
      );

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();

      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  private createRepos(manager: EntityManager) {
    const accessTokenRepo = manager.getCustomRepository(AccessTokenRepository);
    const telegramAccountRepo = manager.getCustomRepository(
      TelegramAccountRepository,
    );

    return {
      accessTokenRepo,
      telegramAccountRepo,
    };
  }
}
