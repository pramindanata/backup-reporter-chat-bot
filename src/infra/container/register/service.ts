import { DependencyContainer } from 'tsyringe';
import { ST } from '@/domain/constant';
import { RegisterDepedencyProviders } from '../interface';
import { TelegramService } from '../../services/telegram';

export const registerServiceProviders: RegisterDepedencyProviders = (
  container: DependencyContainer,
) => {
  container.register(ST.TelegramServiceContract, {
    useFactory: (c) => c.resolve(TelegramService),
  });
};
