import { DependencyContainer } from 'tsyringe';
import { getCustomRepository } from 'typeorm';
import { RT } from '@/domain/constant';
import {
  ORMAccessTokenRepository,
  ORMBackupReportLogRepository,
  ORMTelegramAccountRepository,
} from '../../db/repositories';
import { RegisterDepedencyProviders } from '../interface';

export const registerRepositoryProviders: RegisterDepedencyProviders = (
  container: DependencyContainer,
) => {
  container.register(RT.BackupReportLogRepositoryContract, {
    useFactory: () => getCustomRepository(ORMBackupReportLogRepository),
  });

  container.register(RT.AccessTokenRepositoryContract, {
    useFactory: () => getCustomRepository(ORMAccessTokenRepository),
  });

  container.register(RT.TelegramAccountRepositoryContract, {
    useFactory: () => getCustomRepository(ORMTelegramAccountRepository),
  });
};
