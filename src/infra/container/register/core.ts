import { DependencyContainer } from 'tsyringe';
import { CT } from '@/domain/constant';
import { RegisterDepedencyProviders } from '../interface';
import { DomainEvent } from '../../domain-event';

export const registerCoreProviders: RegisterDepedencyProviders = (
  container: DependencyContainer,
) => {
  container.register(CT.DomainEventContract, {
    useFactory: (c) => c.resolve(DomainEvent),
  });
};
