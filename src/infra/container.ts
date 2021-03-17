import { container, instanceCachingFactory } from 'tsyringe';
import { Telegraf, Telegram } from 'telegraf';
import { getCustomRepository } from 'typeorm';
import { RT, ST, UT, VT } from '@/app/constant';
import {
  FailedBackupReportLogView,
  SuccessBackupReportLogView,
} from '@/adapters/bot/views';
import {
  ORMAccessTokenRepository,
  ORMBackupReportLogRepository,
  ORMTelegramAccountRepository,
} from './db/repositories';
import { ActivateAccessTokenUOW } from './db/uow';
import { TelegramService } from './services/telegram';
import { InfraConfig } from './config';

container.register(Telegraf, {
  useFactory: instanceCachingFactory((c) => {
    const config = c.resolve(InfraConfig);
    const token = config.get('bot.token');
    const telegraf = new Telegraf(token);

    return telegraf;
  }),
});

container.register(Telegram, {
  useFactory: instanceCachingFactory((c) => {
    const config = c.resolve(InfraConfig);
    const token = config.get('bot.token');
    const telegram = new Telegram(token);

    return telegram;
  }),
});

/**
 * RT
 */
container.register(RT.BackupReportLogRepositoryContract, {
  useFactory: () => getCustomRepository(ORMBackupReportLogRepository),
});

container.register(RT.AccessTokenRepositoryContract, {
  useFactory: () => getCustomRepository(ORMAccessTokenRepository),
});

container.register(RT.TelegramAccountRepositoryContract, {
  useFactory: () => getCustomRepository(ORMTelegramAccountRepository),
});

/**
 * UT
 */
container.register(UT.ActivateAccessTokenUOWContract, {
  useFactory: (c) => c.resolve(ActivateAccessTokenUOW),
});

/**
 * VT
 */
container.register(VT.SuccessBackupReportLogViewContract, {
  useFactory: (c) => c.resolve(SuccessBackupReportLogView),
});

container.register(VT.FailedBackupReportLogViewContract, {
  useFactory: (c) => c.resolve(FailedBackupReportLogView),
});

/**
 * ST
 */
container.register(ST.TelegramServiceContract, {
  useFactory: (c) => c.resolve(TelegramService),
});

export { container };
