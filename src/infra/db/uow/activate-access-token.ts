import { User as TelegramUser } from 'typegram';
import { EntityManager, getConnection } from 'typeorm';
import { ActivateAccessTokenUOWContract } from '@/domain/contracts/uow';
import { AccessToken, AccessTokenActivationStatus } from '@/domain/entities';
import {
  ORMAccessTokenRepository,
  ORMTelegramAccountRepository,
} from '../repositories';

export class ActivateAccessTokenUOW implements ActivateAccessTokenUOWContract {
  async execute(accessToken: AccessToken, user: TelegramUser): Promise<void> {
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
    const accessTokenRepo = manager.getCustomRepository(
      ORMAccessTokenRepository,
    );
    const telegramAccountRepo = manager.getCustomRepository(
      ORMTelegramAccountRepository,
    );

    return {
      accessTokenRepo,
      telegramAccountRepo,
    };
  }
}
