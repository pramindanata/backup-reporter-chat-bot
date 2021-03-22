import { DependencyContainer } from 'tsyringe';
import { VT } from '@/domain/constant';
import {
  FailedBackupReportLogView,
  SuccessBackupReportLogView,
} from '@/adapters/bot/views';
import { RegisterDepedencyProviders } from '../interface';

export const registerViewProviders: RegisterDepedencyProviders = (
  container: DependencyContainer,
) => {
  container.register(VT.SuccessBackupReportLogViewContract, {
    useFactory: (c) => c.resolve(SuccessBackupReportLogView),
  });

  container.register(VT.FailedBackupReportLogViewContract, {
    useFactory: (c) => c.resolve(FailedBackupReportLogView),
  });
};
