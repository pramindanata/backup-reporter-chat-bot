import {
  AccessToken,
  AccessTokenActivationStatus,
  TelegramAccount,
} from '@/models';
import {
  AccessTokenRepository,
  TelegramAccountRepository,
} from '@/repositories';
import { User } from 'typegram';
import { EntityManager, getConnection } from 'typeorm';

export class ActivateAccessTokenUOW {
  async execute(accessToken: AccessToken, user: User): Promise<void> {
    const queryRunner = getConnection().createQueryRunner();
    const {
      accessTokenRepository,
      telegramAccountRepository,
    } = this.createRepos(queryRunner.manager);

    await queryRunner.startTransaction();

    try {
      const telegramAccount = await this.createTelegramAccount(
        telegramAccountRepository,
        user,
      );

      await this.updateAccessToken(
        accessTokenRepository,
        accessToken,
        telegramAccount,
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
    const accessTokenRepository = manager.getCustomRepository(
      AccessTokenRepository,
    );
    const telegramAccountRepository = manager.getCustomRepository(
      TelegramAccountRepository,
    );

    return {
      accessTokenRepository,
      telegramAccountRepository,
    };
  }

  private async createTelegramAccount(
    repo: TelegramAccountRepository,
    user: User,
  ): Promise<TelegramAccount> {
    return repo.save({
      accountId: user.id,
      firstName: user.first_name,
      username: user.username,
    });
  }

  private async updateAccessToken(
    repo: AccessTokenRepository,
    accessToken: AccessToken,
    telegramAccount: TelegramAccount,
  ): Promise<void> {
    await repo.update(
      {
        id: accessToken.id,
      },
      {
        activationStatus: AccessTokenActivationStatus.ACTIVATED,
        telegramAccount,
      },
    );
  }
}
