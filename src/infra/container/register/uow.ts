import { DependencyContainer } from 'tsyringe';
import { UT } from '@/domain/constant';
import { RegisterDepedencyProviders } from '../interface';
import { ActivateAccessTokenUOW } from '../../db/uow';

export const registerUOWProviders: RegisterDepedencyProviders = (
  container: DependencyContainer,
) => {
  container.register(UT.ActivateAccessTokenUOWContract, {
    useFactory: (c) => c.resolve(ActivateAccessTokenUOW),
  });
};
